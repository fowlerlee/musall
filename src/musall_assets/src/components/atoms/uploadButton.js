import React, { useEffect, useState, useRef } from 'react';
import { fileupload } from '../../../../declarations/fileupload';
import styled from 'styled-components';

let file;

const uploadChunk = async ({ batch_name, chunk }) =>
  fileupload.create_chunk({
    batch_name,
    content: [...new Uint8Array(await chunk.arrayBuffer())],
  });

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

    promises.push(
      uploadChunk({
        batch_name,
        chunk,
      })
    );
  }

  const chunkIds = await Promise.all(promises);

  console.log(chunkIds);

  await fileupload.commit_batch({
    batch_name,
    chunk_ids: chunkIds.map(({ chunk_id }) => chunk_id),
    content_type: file.type,
  });

  console.log('uploaded');

  loadImage(batch_name);
};

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
};

const Button = styled.button`
  background-color: #f806cc;
  color: white;
  font-size: 1em;
  margin: 2em;
  padding: 0.6em 0.8em;
  border: 2px solid palevioletred;
  border-radius: 15px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

export default function UploadButton() {
  const [selectedFile, setSelectedFile] = useState('');

  return (
    <div>
      <form>
        <Input
          type='file'
          value={selectedFile}
          onChange={(event) => {
            file = event.target.files?.[0];
          }}
          placeholder='Select image file'
        />
        <Button onClick={upload}>Upload Image</Button>
      </form>
    </div>
  );
}
