import { fileupload } from "../../../../../declarations/fileupload";
import canisterIds from "../../../../../../.dfx/local/canister_ids.json";

const UPLOAD_CANISTER_ID = canisterIds.fileupload.local;
const BASE_URL = "http://localhost:8000/assets/";

const uploadChunk = async ({ batch_name, chunk }) => fileupload.create_chunk({
  batch_name,
  content: [...new Uint8Array(await chunk.arrayBuffer())]
})

export const ICPFileUpload = async (file) => {
  // TODO set unique name of the file per user
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
    chunk_ids: chunkIds.map(({ chunk_id }) => chunk_id),
    content_type: file.type
  })

  console.log('uploaded');
  const url = BASE_URL + batch_name + "?canisterId=" + UPLOAD_CANISTER_ID;
  return (url);
}

