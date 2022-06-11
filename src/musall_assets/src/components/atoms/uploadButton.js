import React, { useEffect, useState } from "react";
import { fileupload } from "../../../../declarations/fileupload";

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';


let file;

const uploadChunk = async ({batch_name, chunk}) => fileupload.create_chunk({
  batch_name,
  content: [...new Uint8Array(await chunk.arrayBuffer())]
})

const upload = async () => {
  
  if (!file) {
    alert('No file selected');
    return;
  }

  console.log('start upload');

  const batch_name = file.name;
  const promises = [];
  const chunkSize = 500000;

  for (let start = 0; start < file.size; start += chunkSize) {
    const chunk = file.slice(start, start + chunkSize);

    promises.push(uploadChunk({
      batch_name,
      chunk
    }));
  }

  const chunkIds = await Promise.all(promises);

  console.log(chunkIds);

  await fileupload.commit_batch({
    batch_name,
    chunk_ids: chunkIds.map(({chunk_id}) => chunk_id),
    content_type: file.type
  })

  console.log('uploaded');

  loadImage(batch_name);
}

const loadImage = (batch_name) => {

  if (!batch_name) {
    return;
  }
  
  const newImage = document.createElement('img');
  newImage.src = `http://localhost:8000/assets/${batch_name}?canisterId=rrkah-fqaaa-aaaaa-aaaaq-cai`;

  const img = document.querySelector('section:last-of-type img');
  img?.parentElement.removeChild(img);

  const section = document.querySelector('section:last-of-type');
  section?.appendChild(newImage);
}

const Input = styled('input')({
    display: 'none',
  });

export default function UploadButton(params) {

    return (
        <Stack direction="row" alignItems="center" spacing={2}>
        <label htmlFor="contained-button-file">
          <Input accept="image/*" id="contained-button-file" multiple type="file" />
          <Button variant="contained" component="span">
            Upload
          </Button>
        </label>
        <label htmlFor="icon-button-file">
          <Input accept="image/*" id="icon-button-file" type="file" />
          <IconButton color="primary" aria-label="upload picture" component="span">
            <PhotoCamera />
          </IconButton>
        </label>
      </Stack>
      );
    
}
