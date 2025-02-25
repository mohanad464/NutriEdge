"use client";

import { useState } from "react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import ShopByBrand from "./ShopByBrand";
import WhatsAppButton from "./whatsappButton";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Thank you for subscribing! 🎉");
      setEmail(""); // Clear input
    } else {
      setMessage(data.error || "Something went wrong.");
    }
  };

  return (
    <>
      <ShopByBrand />
      <footer className="bg-gray-900 text-white py-10">
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-bold">NutriEdge</h2>
            <p className="text-gray-400 mt-2">
              Fuel your fitness with premium supplements.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shop" className="hover:text-gray-300">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gray-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gray-300">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-gray-300">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media & Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
            <div className="flex space-x-4">
              <Link
                href="https://www.facebook.com"
                target="_blank"
                className="text-gray-400 hover:text-white"
              >
                <FaFacebook size={24} />
              </Link>
              <Link
                href="https://www.instagram.com"
                target="_blank"
                className="text-gray-400 hover:text-white"
              >
                <FaInstagram size={24} />
              </Link>
              <Link
                href="https://www.twitter.com"
                target="_blank"
                className="text-gray-400 hover:text-white"
              >
                <FaTwitter size={24} />
              </Link>
              <Link
                href="https://www.youtube.com"
                target="_blank"
                className="text-gray-400 hover:text-white"
              >
                <FaYoutube size={24} />
              </Link>
            </div>

            {/* Subscription Form */}
            <h3 className="text-xl font-semibold mt-6 mb-2">
              Get Our Latest Offers
            </h3>
            <form onSubmit={handleSubscribe} className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 rounded-l-md text-gray-900"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-primary px-4 rounded-r-md hover:bg-purple-600"
              >
                Subscribe
              </button>
            </form>
            {message && (
              <p className="mt-2 text-sm text-green-400">{message}</p>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-400 mt-10 border-t border-gray-700 pt-4">
          <p>© {new Date().getFullYear()} NutriEdge. All rights reserved.</p>
        </div>
      </footer>
      <WhatsAppButton />
    </>
  );
}
