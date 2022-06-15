import React, { useEffect, useState, useRef } from 'react';
import { fileupload } from '../../../../declarations/fileupload';

export default function UploadButton() {
  const [file, setFile] = useState(null);
  const [batchName, setBatchName] = useState('');

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
    console.log('file:', file);

    const batch_name = file.name;
    setBatchName(file.name);
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
    newImage.src = `http://localhost:8000/assets/${batch_name}?canisterId=rkp4c-7iaaa-aaaaa-aaaca-cai`;
    // newImage.src = `http://localhost:8000/assets/${batch_name}?canisterId=rrkah-fqaaa-aaaaa-aaaaq-cai`;

    const img = document.querySelector('section:last-of-type img');
    img?.parentElement.removeChild(img);

    const section = document.querySelector('section:last-of-type');
    section?.appendChild(newImage);
  };

  function NewImage({ batch_name }) {
    if (!batch_name) {
      return;
    }

    return (
      <div>
        <h1>⬇️ UPLOADED FILE ⬇️</h1>
        <img
          src={`http://localhost:8000/assets/${batch_name}?canisterId=rkp4c-7iaaa-aaaaa-aaaca-cai`}
          // src={`http://localhost:8000/assets/${batch_name}?canisterId=rrkah-fqaaa-aaaaa-aaaaq-cai`}
          alt='CHUNKS OF FILE'
        />
      </div>
    );
  }

  return (
    <div>
      <form>
        <input
          type='file'
          name=''
          id=''
          onChange={(event) => {
            setFile(event.target.files?.[0]);
          }}
        />
        <button onClick={upload}>Upload Image</button>
      </form>
      <NewImage batch_name={batchName} />
    </div>
  );
}
