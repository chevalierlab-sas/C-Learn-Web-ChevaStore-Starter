import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) return;

    axios
      .get("https://api.marketplace.muhhendikaputra.my.id/api/v1/auth/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-Client-Type": "web",
        },
      })
      .then((res) => {
        setUser(res.data.data);
        setIsLoggedIn(true);
      })
      .catch(() => {
        setIsLoggedIn(false);
        setUser(null);
      });
  }, []);

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setIsLoggedIn(false);
    setUser(null);
    window.location.href = "/";
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between">
        {/* Logo + Name */}
        <a href="/" className="flex items-center space-x-2">
          <img src="/chevalier-logo.png" alt="ChevaStore Logo" className="h-8 w-8" />
          <span className="text-2xl font-bold text-[#de8b27]">ChevaStore</span>
        </a>

        {/* Search Bar */}
        <div className="hidden md:block w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#de8b27]"
          />
        </div>

        {/* Auth Buttons or Profile */}
        <div className="flex items-center space-x-4">
          {!isLoggedIn ? (
            <>
              <a
                href="/login"
                className="px-4 py-2 text-[#de8b27] border border-[#de8b27] rounded hover:bg-[#de8b27] hover:text-white cursor-pointer"
              >
                Masuk
              </a>
              <a
                href="/register"
                className="px-4 py-2 bg-[#de8b27] text-white rounded hover:bg-[#c77b23] cursor-pointer"
              >
                Daftar
              </a>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 border px-3 py-2 rounded hover:bg-gray-100"
              >
                <img src="https://i.pravatar.cc/40" alt="profile" className="rounded-full h-8 w-8" />
                <span className="text-sm font-medium">{user?.name || "Akun"}</span>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-50">
                  <a href="/profile" className="block px-4 py-2 hover:bg-gray-100">
                    Profil Saya
                  </a>
                  <a href="/my/toko" className="block px-4 py-2 hover:bg-gray-100">
                    Toko Saya
                  </a>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100">
                    Keluar
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search */}
      <div className="block md:hidden px-4 pb-3">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#de8b27]"
        />
      </div>
    </nav>
  );
}
