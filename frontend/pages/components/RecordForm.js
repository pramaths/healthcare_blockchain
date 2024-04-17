import React, { useState } from 'react';
import { useAccount, useContract, useSigner } from 'wagmi';
import { uploadToIPFS } from '../lib/ipfs';
import { encrypt } from '../lib/crypto';
import { getContract } from '../lib/blockchain';

const RecordForm = () => {
  const [file, setFile] = useState(null);
  const { data: signer } = useSigner();
  const contract = getContract(signer);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) return;

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = async () => {
      const buffer = Buffer(reader.result);
      const encrypted = encrypt(buffer.toString());
      const ipfsPath = await uploadToIPFS(Buffer.from(encrypted.content));
      const tx = await contract.addRecord(ipfsPath, JSON.stringify({ iv: encrypted.iv }));
      await tx.wait();
      alert('Record added successfully!');
    };
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="file" onChange={handleFileChange} className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-violet-700
          hover:file:bg-violet-100"/>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Upload Record</button>
      </form>
    </div>
  );
};

export default RecordForm;
