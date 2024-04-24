// frontend/components/Navbar.js
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <Link href="/">
          <a className="font-semibold">Healthchain</a>
        </Link>
        <div>
          <Link href="/login">
            <a className="ml-4">Login</a>
          </Link>
          <Link href="/records">
            <a className="ml-4">Records</a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
