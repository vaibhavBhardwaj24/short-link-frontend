import { Link } from "react-router-dom";
import { HomeIcon, LinkIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";
export default function Navbar() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link
              to="/"
              className="flex items-center px-3 text-gray-700 hover:text-gray-900"
            >
              <span className="font-semibold">ShortLink</span>
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/"
              className="flex items-center px-3 text-gray-500 hover:text-gray-700"
            >
              <HomeIcon className="h-5 w-5 mr-1" />
              Dashboard
            </Link>
            <Link
              to="/create"
              className="flex items-center px-3 text-gray-500 hover:text-gray-700"
            >
              <LinkIcon className="h-5 w-5 mr-1" />
              Create Link
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
