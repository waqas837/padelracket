// RacketList.jsx (Server Component)
import Link from "next/link";
import RacketFilters from "../../../components/RacketFilters/Filters";

// Your racket data (in a real app, this would come from a database or API)
const rackets = [
  {
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
    metrics: {
      power: 87,
      control: 83,
      rebound: 90,
      maneuverability: 75,
      sweetSpot: 91,
    },
  },
  {
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
    metrics: {
      power: 82,
      control: 100,
      rebound: 75,
      maneuverability: 86,
      sweetSpot: 88,
    },
  },
];

// Extract unique values for filter options
const brands = [...new Set(rackets.map((racket) => racket.brand))];
const levels = [...new Set(rackets.map((racket) => racket.level))];
const shapes = [...new Set(rackets.map((racket) => racket.shape))];
const types = [...new Set(rackets.map((racket) => racket.type))];
const forWhoms = [...new Set(rackets.map((racket) => racket.forWhom))];
const faces = [...new Set(rackets.map((racket) => racket.face))];

const RacketList = () => {
  return (
    <div className="px-4 py-6 md:px-6 md:py-10">
      <div className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/collections" className="hover:text-black">
          Collections
        </Link>
        <span className="mx-2">/</span>
        <Link href="/collections/rackets" className="hover:text-black">
          Rackets
        </Link>
      </div>

      {/* Pass the rackets and filter options to the client component */}
      <RacketFilters
        rackets={rackets}
        filterOptions={{
          brands,
          levels,
          shapes,
          types,
          forWhoms,
          faces,
        }}
      />
    </div>
  );
};

export default RacketList;
