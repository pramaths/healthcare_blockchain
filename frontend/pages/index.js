// frontend/pages/index.js
import { useEthers } from '@usedapp/core';
import { ConnectButton } from '@connectkit/client';
import Link from 'next/link';

export default function Home() {
  const { account } = useEthers();

  return (
    <div className="p-8">
      <ConnectButton />
      {account && (
        <div>
          <h1 className="text-2xl font-bold">Welcome, {account}</h1>
          <Link href="/records">
            <a className="mt-4 inline-block bg-blue-500 text-white p-2 rounded">Manage Records</a>
          </Link>
        </div>
      )}
    </div>
  );
}
s