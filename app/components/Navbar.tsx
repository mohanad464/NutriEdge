"use client";

import { Button } from "@/components/ui/button";
import { ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useShoppingCart } from "use-shopping-cart";
import { useEffect, useState } from "react";

const links = [
  { name: "Home", href: "/" },
  { name: "Protein", href: "/Protein" },
  { name: "Creatine", href: "/Creatine" },
  { name: "Accessories", href: "/Accessories" },
];

export default function Navbar() {
  const pathName = usePathname();
  const router = useRouter();
  const { handleCartClick } = useShoppingCart();
  const [user, setUser] = useState<{ name: string } | null>(null);

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/");
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-md z-50 border-b border-gray-200">
      <div className="flex items-center justify-between mx-auto max-w-7xl px-6 py-4">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Nutri<span className="text-primary">Edge</span>
          </h1>
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex gap-10">
          {links.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className={`relative text-lg font-medium transition duration-200 ${
                pathName === link.href
                  ? "text-primary after:absolute after:left-0 after:bottom-[-2px] after:h-[2px] after:w-full after:bg-gradient-to-r from-primary to-blue-500"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Cart Button */}
          <Button
            onClick={handleCartClick}
            variant="outline"
            className="relative flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14 rounded-full border-gray-300 shadow-lg hover:shadow-xl transition duration-200 hover:scale-105"
          >
            <ShoppingBag className="h-6 w-6 text-gray-700" />
          </Button>

          {user ? (
            <div className="flex items-center space-x-4">
              {/* User Icon */}
              <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg">
                <User className="h-6 w-6 text-gray-700" />
                <span className="text-gray-700 font-medium">{user.name}</span>
              </div>

              {/* Logout Button */}
              <Button onClick={handleLogout} variant="destructive">
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex space-x-4">
              <Button onClick={() => router.push("/login")} variant="default">
                Login
              </Button>
              <Button onClick={() => router.push("/register")} variant="default">
                Register
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
