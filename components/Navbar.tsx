import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="flex justify-between items-center px-6">
        <h1 className="text-xl font-semibold text-gray-700"><Link href="/">DSA Tracker</Link></h1>
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className="text-gray-600 hover:text-blue-600">
              Home
            </Link>
          </li>
          <li>
            <Link href="/problems" className="text-gray-600 hover:text-blue-600">
              Problems Page
            </Link>
          </li>
          <li>
            <Link href="/profile" className="text-gray-600 hover:text-blue-600">
              Profile
            </Link>
          </li>
          <li>
            <Link href="/admin" className="text-gray-600 hover:text-blue-600">
              Admin Panel
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
