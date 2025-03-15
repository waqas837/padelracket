"use client";

import Link from "next/link";
import { Facebook, Instagram, Send, MessageCircleMore } from "lucide-react"; 

const Footer = () => {
  const currentURL = typeof window !== "undefined" ? window.location.href : "https://paddleracket.site";
  const encodedURL = encodeURIComponent(currentURL);
  const shareText = encodeURIComponent("Check out this amazing site for paddle rackets!");

  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm">&copy; {new Date().getFullYear()} Paddleracket. All rights reserved.</p>
          
          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4 sm:mt-0 items-center">
            <span className="text-sm font-semibold">Share on:</span>

            {/* WhatsApp */}
            <Link
              href={`https://api.whatsapp.com/send?text=${shareText}%20${encodedURL}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircleMore className="w-6 h-6 hover:text-green-500 transition" />
            </Link>

            {/* Telegram */}
            <Link
              href={`https://t.me/share/url?url=${encodedURL}&text=${shareText}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Send className="w-6 h-6 hover:text-blue-400 transition" />
            </Link>

            {/* Facebook */}
            <Link
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="w-6 h-6 hover:text-blue-500 transition" />
            </Link>

            {/* Instagram */}
            <Link
              href={`https://www.instagram.com/?url=${encodedURL}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="w-6 h-6 hover:text-pink-500 transition" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
