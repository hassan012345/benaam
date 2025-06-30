import React, { useState } from "react";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Header = () => {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  // Helper to get initials from user name/email
  const getInitials = (nameOrEmail: string) => {
    if (!nameOrEmail) return "?";
    const parts = nameOrEmail.split(" ");
    if (parts.length > 1) return parts[0][0] + parts[1][0];
    return nameOrEmail.slice(0, 2).toUpperCase();
  };

  return (
    <header className="w-full bg-gray-800 text-white shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        {/* App Name/Logo */}
        <div
          className="text-2xl font-bold cursor-pointer select-none"
          onClick={() => router.push("/")}
        >
          benaam
        </div>
                <p className="text-xl md:text-4xl md:font-bold">You have lost something?Here's how to find!</p>
        {/* Right Side: Auth/Profile */}
        <div className="relative flex items-center">
          {session?.user ? (
            <>
              {/* Avatar Button */}
              <button
                className="flex items-center focus:outline-none"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Open user menu"
              >
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt="User Avatar"
                    width={36}
                    height={36}
                    className="rounded-full border-2 border-white"
                  />
                ) : (
                  <span className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold text-lg border-2 border-white">
                    {getInitials(session.user.name || session.user.email || "")}
                  </span>
                )}
              </button>
              {/* Dropdown Menu */}
              {menuOpen && (
                <div className="absolute right-0 mt-4 w-40 bg-white text-gray-800 rounded shadow-lg z-50 animate-fade-in">
                  <div className="px-4 py-2 border-b">
                    <span className="font-semibold">
                      {session.user.name || session.user.email}
                    </span>
                  </div>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setMenuOpen(false);
                      router.push("/profile");
                    }}
                  >
                    Profile
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setMenuOpen(false);
                      signOut({ callbackUrl: "/login" });
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
              {/* Overlay to close menu when clicking outside */}
              {menuOpen && (
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setMenuOpen(false)}
                />
              )}
            </>
          ) : (
            <button
              className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors font-semibold"
              onClick={() => signIn()}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
