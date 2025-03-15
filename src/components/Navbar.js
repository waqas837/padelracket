"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const pathname = usePathname();
  const navItems = [
    { name: "Collections", href: "/collections" },
    { name: "Rackets", href: "/collections/rackets" },
  ];

  const instructionsItem = { name: "Guides", href: "/guides" };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearchModal = () => {
    setIsSearchModalOpen(!isSearchModalOpen);
  };

  const handleSearch = () => {
    // Implement search logic here
    console.log("Search Query:", searchQuery);
    console.log("Selected Category:", selectedCategory);
  };

  return (
    <header>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold">
                <Image alt="logo" src={"/logo.png"} width={50} height={50} />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8 justify-center w-full">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${
                    pathname === item.href
                      ? "border-b-2 border-black text-black"
                      : "border-transparent text-gray-600 hover:border-black hover:text-black"
                  } inline-flex items-center px-1 pt-1 text-sm font-medium`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* Search Input (Looks normal but is clickable) */}
            <button
              onClick={toggleSearchModal}
              className="flex items-center border border-gray-300 overflow-hidden bg-white hover:bg-gray-100 focus:outline-none w-64"
            >
              <div className="px-4 py-2 text-gray-400 w-full text-left">
                Search...
              </div>
              <div className="bg-black text-white px-4 py-2 hover:bg-gray-800">
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </button>
            {/* Guides Link (Hidden on small screens) */}
            <div className="hidden sm:flex">
              <Link
                href={instructionsItem.href}
                className={`${
                  pathname === instructionsItem.href
                    ? "border-b-2 border-black text-black"
                    : "border-transparent text-gray-600 hover:border-black hover:text-black"
                } inline-flex items-center px-1 pt-1 text-sm font-medium`}
              >
                {instructionsItem.name}
              </Link>
            </div>
          </div>
          <div className="flex -mr-2 sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={toggleMobileMenu}
                  className={`${
                    pathname === item.href
                      ? "border-b-2 border-black text-black"
                      : "border-transparent text-gray-600 hover:border-black hover:text-black"
                  } block px-3 py-2 text-base font-medium`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href={instructionsItem.href}
                className={`${
                  pathname === instructionsItem.href
                    ? "border-b-2 border-black text-black"
                    : "border-transparent text-gray-600 hover:border-black hover:text-black"
                } block px-3 py-2 text-base font-medium`}
              >
                {instructionsItem.name}
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Search Modal */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 w-11/12 max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Advanced Search</h2>
              <button
                onClick={toggleSearchModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 mb-4"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 mb-4"
            >
              <option value="">All Categories</option>
              <option value="collections">Collections</option>
              <option value="rackets">Rackets</option>
              <option value="guides">Guides</option>
            </select>
            <button
              onClick={handleSearch}
              className="w-full bg-black text-white px-4 py-2 hover:bg-gray-800"
            >
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
