// frontend/pages/login.js
import { ConnectButton } from '@connectkit/client';

export default function Login() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Login to Your Account</h1>
        <ConnectButton />
      </div>
    </div>
  );
}
