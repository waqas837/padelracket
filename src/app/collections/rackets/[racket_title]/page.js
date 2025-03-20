export const dynamic = "force-dynamic";
import pool from "@/lib/db";
import { mywebsiteurl } from "@/lib/myurl";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// getRacketBySlug single racket
const getRacketBySlug = async (racket_title) => {
  let connection = await pool.getConnection();
  try {
    let [results] = await connection.query("SELECT * FROM posts Where slug=?", [
      racket_title,
    ]);

    if (results.length > 0) {
      return results[0];
    } else {
      return undefined;
    }
  } catch (error) {
  } finally {
    if (connection) connection.release(); // Ensure the connection is released
  }
};

export default async function RacketDetail({ params }) {
  const racket = await getRacketBySlug(params.racket_title);
  const requiredFields = [
    "power",
    "control",
    "rebound",
    "maneuverability",
    "sweetSpot",
  ];

  // This would typically come from a database - using the same mock data
  const rackets = async () => {
    let connection = await pool.getConnection();
    try {
      let [results] = await connection.query("SELECT * FROM posts LIMIT 4");

      if (results.length > 0) {
        return results;
      } else {
        return undefined;
      }
    } catch (error) {
    } finally {
      if (connection) connection.release(); // Ensure the connection is released
    }
  };
  let relatedRacket = await rackets();
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
        <div className="bg-white shadow-md p-6 flex items-center justify-center">
          <div className="relative w-full h-96">
            <img
              src={`${mywebsiteurl}${racket.filePath}`}
              alt={racket.title}
              className="object-contain w-full h-full"
            />
          </div>
        </div>

        {/* Details Section */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-800">{racket.title}</h1>

          {/* Brand and Rating */}
          <div className="flex items-center mt-2 mb-4">
            <span className="text-gray-600 font-medium">{racket.brand}</span>
            <span className="mx-2">Ratings•</span>
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`text-yellow-400 text-sm ${
                    i < Math.round(racket.ratings)
                      ? "opacity-100"
                      : "opacity-30"
                  }`}
                >
                  ★
                </span>
              ))}
              <span className="ml-1 text-sm text-gray-600">
                ({racket.ratings})
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
          <div className="bg-gray-50 p-4 mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Specifications</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Year</p>
                <p className="font-medium">{racket.Year}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Level</p>
                <p className="font-medium">{racket.Level}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Shape</p>
                <p className="font-medium">{racket.Shape}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Type</p>
                <p className="font-medium">{racket.Type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">For</p>
                <p className="font-medium">{racket.forGender}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Face</p>
                <p className="font-medium">{racket.Face}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Weight</p>
                <p className="font-medium">{racket.Weight}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Frame Thickness</p>
                <p className="font-medium">{racket.FrameThickness}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Balance</p>
                <p className="font-medium">{racket.Balance}</p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Link
              href={racket.amazonLink}
              target="_blank"
              className="bg-yellow-600 hover:bg-yellow-700 text-white py-3 px-6 font-medium flex-1 transition-colors text-center"
            >
              Buy It From Amazon
            </Link>
            {/* <button className="border border-gray-300 hover:border-gray-400 text-gray-700 py-3 px-6 font-medium flex-1 transition-colors">
              Add to Wishlist
            </button> */}
          </div>
        </div>
      </div>

      {/* Performance Metrics Section */}
      {/* Performance Metrics Section */}
      <div className="mt-12 bg-white shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Performance Metrics
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {Object.entries(racket)
            .filter(([key]) => requiredFields.includes(key))
            .map(([key, value]) => (
              <div key={key} className="flex flex-col items-center">
                <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-2">
                  <div
                    className="absolute top-0 left-0 h-full bg-gray-600 rounded-full"
                    style={{ width: `${value}%` }}
                  ></div>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-bold text-gray-600">{value}</span>
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
      <div className="mt-12 bg-white shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Key Features</h2>
        <ul
          dangerouslySetInnerHTML={{ __html: racket.KeyFeatures }}
          className="space-y-3"
        />
      </div>

      {/* Related Products (placeholder) */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          You May Also Like
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedRacket &&
            relatedRacket.map((relatedRacket) => (
              <Link
                href={`/collections/rackets/${relatedRacket.slug}`}
                key={relatedRacket.id}
                className="bg-white shadow-md p-4 text-center transition-transform transform hover:scale-105"
              >
                <img
                  src={`${mywebsiteurl}${relatedRacket.filePath}`}
                  alt={relatedRacket.title}
                  className="w-full h-32 object-contain mx-auto"
                />
                <h3 className="text-lg font-semibold mt-3">
                  {relatedRacket.title}
                </h3>
                <p className="text-gray-600 font-bold">
                  ${relatedRacket.price}
                </p>
                <div className="flex justify-center items-center mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`text-yellow-400 text-sm ${
                        i < Math.round(relatedRacket.ratings)
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
