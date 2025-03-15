// app/rackets/[id]/page.jsx
import Link from "next/link";
import { notFound } from "next/navigation";

// This would typically come from a database - using the same mock data
const rackets = [
  {
    id: "adidas-metalbone",
    name: "Adidas Metalbone",
    img: "/rackets/adidas-metalbone.png",
    price: 299,
    rating: 4.8,
    year: 2024,
    brand: "Adidas",
    level: "Pro",
    shape: "Diamond",
    type: "Power",
    forWhom: "Men",
    balance: "High",
    face: "Carbon",
    weight: "375g",
    frameThickness: "38mm",
    description:
      "The Adidas Metalbone is a premium racket designed for professional players who demand power and precision. The diamond shape provides an expanded sweet spot in the upper part of the racket, making it ideal for offensive play.",
    features: [
      "Carbon fiber frame for maximum strength and minimum weight",
      "Dual Exoskeleton structure for improved stability",
      "Anti-vibration system reduces arm fatigue",
      "Power-focused design with excellent control",
      "Optimized weight distribution for faster swing speeds",
    ],
    metrics: {
      power: 87,
      control: 83,
      rebound: 90,
      maneuverability: 75,
      sweetSpot: 91,
    },
  },
  {
    id: "babolat-viper",
    name: "Babolat Viper",
    img: "/rackets/babolat-viper.png",
    price: 249,
    rating: 4.6,
    year: 2023,
    brand: "Babolat",
    level: "Advanced",
    shape: "Teardrop",
    type: "Versatile",
    forWhom: "Women",
    balance: "Medium",
    face: "Fiberglass",
    weight: "355g",
    frameThickness: "35mm",
    description:
      "The Babolat Viper is a versatile racket offering an excellent balance between power and control. Its teardrop shape provides a generous sweet spot, making it ideal for players looking to improve their game.",
    features: [
      "Fiberglass construction for better feel and flexibility",
      "Advanced X-EVA material absorbs vibration",
      "Medium balance for all-around performance",
      "Precision string pattern for enhanced spin potential",
      "Reinforced frame for durability",
    ],
    metrics: {
      power: 82,
      control: 100,
      rebound: 75,
      maneuverability: 86,
      sweetSpot: 88,
    },
  },
];

// Get racket by ID (in a real app, this would query a database)
const getRacketById = (id) => {
  return rackets.find((racket) => racket.id === id);
};

export default function RacketDetail({ params }) {
  const racket = getRacketById(params.racket_title);

  // If racket not found, show 404 page
  if (!racket) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-10">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/collections" className="hover:text-blue-600">
          Collections
        </Link>
        <span className="mx-2">/</span>
        <Link href="/collections/rackets" className="hover:text-blue-600">
          Rackets
        </Link>
        <span className="mx-2">/</span>
        <span className="font-medium text-gray-700">{racket.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Section */}
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center">
          <div className="relative w-full h-96">
            <img
              src={racket.img}
              alt={racket.name}
              className="object-contain w-full h-full"
            />
          </div>
        </div>

        {/* Details Section */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-800">{racket.name}</h1>

          {/* Brand and Rating */}
          <div className="flex items-center mt-2 mb-4">
            <span className="text-gray-600 font-medium">{racket.brand}</span>
            <span className="mx-2">•</span>
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`text-yellow-400 text-sm ${
                    i < Math.round(racket.rating) ? "opacity-100" : "opacity-30"
                  }`}
                >
                  ★
                </span>
              ))}
              <span className="ml-1 text-sm text-gray-600">
                ({racket.rating})
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="text-2xl font-bold text-gray-900 mb-6">
            ${racket.price}
          </div>

          {/* Description */}
          <p className="text-gray-700 mb-6">{racket.description}</p>

          {/* Specifications Card */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Specifications</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Year</p>
                <p className="font-medium">{racket.year}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Level</p>
                <p className="font-medium">{racket.level}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Shape</p>
                <p className="font-medium">{racket.shape}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Type</p>
                <p className="font-medium">{racket.type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">For</p>
                <p className="font-medium">{racket.forWhom}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Face</p>
                <p className="font-medium">{racket.face}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Weight</p>
                <p className="font-medium">{racket.weight}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Frame Thickness</p>
                <p className="font-medium">{racket.frameThickness}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Balance</p>
                <p className="font-medium">{racket.balance}</p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium flex-1 transition-colors">
              Add to Cart
            </button>
            <button className="border border-gray-300 hover:border-gray-400 text-gray-700 py-3 px-6 rounded-lg font-medium flex-1 transition-colors">
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* Performance Metrics Section */}
      <div className="mt-12 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Performance Metrics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {Object.entries(racket.metrics).map(([key, value]) => (
            <div key={key} className="flex flex-col items-center">
              <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-2">
                <div
                  className="absolute top-0 left-0 h-full bg-blue-600 rounded-full"
                  style={{ width: `${value}%` }}
                ></div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-bold text-blue-600">{value}</span>
                <span className="text-sm text-gray-600">/100</span>
              </div>
              <p className="text-center text-gray-700 capitalize mt-1">
                {key === "sweetSpot" ? "Sweet Spot" : key}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-12 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Key Features</h2>
        <ul className="space-y-3">
          {racket.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Related Products (placeholder) */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          You May Also Like
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {rackets
            .filter((r) => r.id !== racket.id)
            .map((relatedRacket) => (
              <Link
                href={`/rackets/${relatedRacket.id}`}
                key={relatedRacket.id}
                className="bg-white shadow-md rounded-lg p-4 text-center transition-transform transform hover:scale-105"
              >
                <img
                  src={relatedRacket.img}
                  alt={relatedRacket.name}
                  className="w-full h-32 object-contain mx-auto"
                />
                <h3 className="text-lg font-semibold mt-3">
                  {relatedRacket.name}
                </h3>
                <p className="text-gray-600 font-bold">
                  ${relatedRacket.price}
                </p>
                <div className="flex justify-center items-center mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`text-yellow-400 text-sm ${
                        i < Math.round(relatedRacket.rating)
                          ? "opacity-100"
                          : "opacity-30"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
