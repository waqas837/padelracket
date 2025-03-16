// app/collections/page.jsx
import Link from "next/link";

const collectionsData = [
  {
    id: "rackets",
    title: "Padel Rackets",
    description:
      "Premium quality padel rackets for all skill levels and playing styles",
    image: "/collections/rackets-collection.jpg",
    itemCount: 24,
    featured: true,
  },
  {
    id: "shoes",
    title: "Padel Shoes",
    description:
      "Specialized footwear designed for optimal grip, stability and comfort on padel courts",
    image: "/collections/shoes-collection.jpg",
    itemCount: 16,
    featured: true,
  },
  {
    id: "apparel",
    title: "Padel Apparel",
    description:
      "Technical sportswear designed for performance and comfort during play",
    image: "/collections/apparel-collection.jpg",
    itemCount: 32,
    featured: true,
  },
  {
    id: "balls",
    title: "Padel Balls",
    description:
      "Tournament-grade padel balls with optimal pressure and bounce characteristics",
    image: "/collections/balls-collection.jpg",
    itemCount: 8,
    featured: false,
  },
  {
    id: "bags",
    title: "Padel Bags",
    description:
      "Specialized bags designed to carry and protect your padel equipment",
    image: "/collections/bags-collection.jpg",
    itemCount: 12,
    featured: false,
  },
  {
    id: "accessories",
    title: "Accessories",
    description:
      "Essential padel accessories including grips, protective gear, and training aids",
    image: "/collections/accessories-collection.jpg",
    itemCount: 28,
    featured: false,
  },
];

export default function CollectionsPage() {
  // Separate featured and regular collections
  const featuredCollections = collectionsData.filter(
    (collection) => collection.featured
  );
  const regularCollections = collectionsData.filter(
    (collection) => !collection.featured
  );

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
        Product Collections
      </h1>
      <p className="text-gray-600 text-center mb-10 md:mb-12 max-w-2xl mx-auto">
        Browse our complete range of premium padel equipment, apparel, and
        accessories
      </p>

      {/* Featured Collections - Larger Cards */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200">
          Featured Collections
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCollections.map((collection) => (
            <Link
              href={`/collections/${collection.id}`}
              key={collection.id}
              className="group bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="text-xl font-bold mb-1">{collection.title}</h3>
                  <p className="text-sm text-white/80">
                    {collection.itemCount} Products
                  </p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm">
                  {collection.description}
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-blue-600 font-medium group-hover:underline">
                    Shop Now
                  </span>
                  <span className="text-gray-500 text-sm">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Regular Collections - Smaller Cards */}
      <div>
        <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200">
          More Collections
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {regularCollections.map((collection) => (
            <Link
              href={`/collections/${collection.id}`}
              key={collection.id}
              className="group flex bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative w-1/3 overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="w-2/3 p-4">
                <h3 className="text-lg font-bold mb-1">{collection.title}</h3>
                <p className="text-xs text-gray-500 mb-2">
                  {collection.itemCount} Products
                </p>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                  {collection.description}
                </p>
                <span className="text-blue-600 text-sm font-medium group-hover:underline">
                  View Collection →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Categories Banner */}
      <div className="mt-16 mb-12 bg-gradient-to-r from-gray-900 to-gray-700 rounded-lg overflow-hidden">
        <div className="px-6 py-12 md:px-10 md:py-16 text-white max-w-3xl">
          <h2 className="text-3xl font-bold mb-4">
            Find the Perfect Equipment for Your Game
          </h2>
          <p className="mb-6 text-white/80">
            From professional-grade rackets to comfortable footwear and
            everything in between, we have everything you need to elevate your
            padel performance.
          </p>
          <div className="flex flex-wrap gap-3">
            {collectionsData.map((collection) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.id}`}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full text-white transition-colors"
              >
                {collection.title}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* New Arrivals Highlight */}
      {/* <div className="mb-16"> */}
        {/* <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">New Arrivals</h2>
          <Link href="/products/new" className="text-blue-600 hover:underline">
            View all →
          </Link>
        </div> */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4"> */}
          {/* Example new products - in a real app these would be dynamic */}
          {/* {[1, 2, 3, 4].map((i) => ( */}
            {/* <Link
              href={`/products/new-arrival-${i}`}
              key={i}
              className="bg-white shadow-md rounded-lg p-3 text-center transition-transform transform hover:scale-105"
            >
              <div className="relative mb-2">
                <img
                  src={`/products/new-arrival-${i}.jpg`}
                  alt={`New Arrival ${i}`}
                  className="w-full h-36 object-contain"
                />
                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  NEW
                </span>
              </div>
              <h3 className="text-sm font-semibold truncate">
                New Product {i}
              </h3>
              <p className="text-gray-600 font-bold mt-1">${99 + i * 10}</p>
            </Link> */}
          { /* ))} */}
        {/* </div> */}
      {/* </div> */}

      {/* Brands Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center mb-8">Shop by Brand</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {["Adidas", "Babolat", "Head", "Wilson", "Bullpadel", "Nox"].map(
            (brand) => (
              <Link
                href={`/brands/${brand.toLowerCase()}`}
                key={brand}
                className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-center hover:shadow-md transition-shadow"
              >
                <img
                  src={`/brands/${brand.toLowerCase()}.png`}
                  alt={brand}
                  className="max-h-10 opacity-75 hover:opacity-100 transition-opacity"
                />
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
}
