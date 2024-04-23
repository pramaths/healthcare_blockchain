import React, { useState } from "react";
import { ethers } from "ethers";
import AES from "crypto-js/aes";
import axios from "axios";
import contractABI from "../../artifacts/contracts/PatientData.sol/PatientData.json";
import { useAccount } from "wagmi";
import Link from "next/link";

const contractAddress = "0x6Cf2162c75549C7b375A2b3D505F26FC4213Bc4E";

export default function UploadHealthData() {
  const [file, setFile] = useState(null);
  const [encryptionKey, setEncryptionKey] = useState("");
  const { address } = useAccount();
  const [healthRecords, setHealthRecords] = useState([]);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleEncryptionKeyChange = (event) => {
    setEncryptionKey(event.target.value);
  };

  const encryptAndUpload = async () => {
    if (!file || !encryptionKey) {
      alert("Please select a file and set an encryption key.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async function () {
      const data = reader.result;
      const encrypted = AES.encrypt(data, encryptionKey).toString();
      const ipfsHash = await uploadToPinata(encrypted);
      console.log("hel",ipfsHash)
      await saveHashToBlockchain(ipfsHash);
      fetchHealthRecords(); 
    };
    reader.readAsBinaryString(file);
  };

  const uploadToPinata = async (encryptedData) => {
    const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
    let data = new FormData();
    data.append(
      "file",
      new Blob([encryptedData], { type: "application/octet-stream" })
    );

    const response = await axios.post(url, data, {
      headers: {
        pinata_api_key: "e34735166f77d9774e38",
        pinata_secret_api_key:
          "6274d6ffeea86e290bc08dc341f2fcb50996e80b2fd58e0df3510a3abd310f7b",
      },
    });

    return response.data.IpfsHash;
  };

  const saveHashToBlockchain = async (ipfsHash) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      contractABI.abi,
      signer
    );
    console.log(ipfsHash)
    const transaction = await contract.addHealthRecord(ipfsHash);
    await transaction.wait();
  };
  const fetchHealthRecords = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []); // Request account access if needed
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI.abi, signer);
      const address = await signer.getAddress();
      console.log('Fetching records for address:', address);
  
      const records = await contract.getHealthRecords();
      console.log('Fetched records:', records);
      setHealthRecords(records);
    } catch (error) {
      console.error('Failed to fetch health records:', error);
    }
  };
  
console.log("pramth",healthRecords)
  return (
    <main className="container mx-auto p-4 bg-white">
      <nav className="bg-gray-800 text-white p-3 rounded">
        {address ? (
          <div>Logged in as: {address}</div>
        ) : (
          <div>Not connected <Link href='/'></Link></div>
        )}
      </nav>
      <div className="mt-5">
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border file:border-gray-300 file:text-sm file:font-semibold file:bg-white file:text-gray-700 hover:file:bg-gray-100"
        />
        <input
          type="text"
          placeholder="Enter your encryption key..."
          value={encryptionKey}
          onChange={handleEncryptionKeyChange}
          className="mt-3 p-2 border rounded w-full"
        />
        <button
          onClick={encryptAndUpload}
          className="mt-3 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Upload and Encrypt Data
        </button>
        {healthRecords.length > 0 && (
          <div className="mt-5">
            <h3 className="text-lg font-semibold">Health Records:</h3>
            <ul>
              {healthRecords.map((record, index) => (
                <li key={index}>{record}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
