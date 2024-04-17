import { create } from 'ipfs-http-client';

const client = create('https://ipfs.infura.io:5001/api/v0');

export async function uploadToIPFS(fileBuffer) {
  try {
    const added = await client.add(fileBuffer);
    return added.path;
  } catch (error) {
    console.error('Error uploading file: ', error);
    return null;
  }
}

export async function fetchFromIPFS(cid) {
  try {
    const stream = client.cat(cid);
    let data = '';

    for await (const chunk of stream) {
      data += chunk.toString();
    }

    return data;
  } catch (error) {
    console.error('Error downloading file from IPFS: ', error);
    return null;
  }
}
