import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Info, ThumbsUp, Truck } from "lucide-react";
import { mywebsiteurl } from "@/lib/myurl";

const LatestPaddleRacketHome = ({ rackets }) => {
  return (
    <>
      <h2 className="text-center text-3xl font-bold text-gray-800 mb-10">
        Latest Padel Rackets
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {rackets &&
          rackets.map((racket, index) => {
            // Determine if free delivery is available (could be based on price or a property)
            const hasFreeDelivery = racket.price >= 100; // Example condition

            return (
              <div
                key={index}
                className="relative bg-white shadow-md hover:shadow-xl transition-all duration-300"
              >
                {/* Image area */}
                <Link
                  href={`/collections/rackets/${racket.slug
                    .toLowerCase()
                    .replace(/ /g, "-")}`}
                  className="block"
                >
                  <div className="relative h-64 w-full bg-gray-50 overflow-hidden">
                    <img
                      src={`${mywebsiteurl}${racket.filePath}`}
                      alt={racket.title}
                      width={300}
                      height={300}
                      className="h-full w-full object-contain p-4 transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </Link>

                {/* Rating and Year badges */}
                <div className="absolute left-0 top-0 bg-black text-white px-2 py-1 text-sm">
                  <span>{racket.ratings} RATING</span>
                </div>

                <div className="absolute right-0 top-0 bg-black text-white px-3 py-1 text-sm">
                  <span>{racket.Year}</span>
                </div>

                {/* Racket info */}
                <div className="p-4">
                  <div className="mb-3 flex justify-between items-start">
                    <h3 className="text-lg font-bold text-gray-900">
                      <Link
                        href={`/collections/rackets/${racket.slug
                          .toLowerCase()
                          .replace(/ /g, "-")}`}
                      >
                        {racket.title}
                      </Link>
                    </h3>
                    <p className="text-xl font-bold text-black">
                      ${racket.price}
                    </p>
                  </div>

                  {/* Product highlights */}
                  <div className="flex flex-col space-y-2 mb-4">
                    <div className="flex items-center">
                      <ThumbsUp className="w-5 h-5 mr-2 text-black" />
                      <span>Top quality performance racket</span>
                    </div>
                    {hasFreeDelivery && (
                      <div className="flex items-center">
                        <Truck className="w-5 h-5 mr-2 text-black" />
                        <span>Free delivery available</span>
                      </div>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex justify-between mt-4">
                    <Link
                      href={racket.amazonLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 transition-colors duration-200 w-3/4"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Buy on Amazon
                    </Link>
                    <Link
                      href={`/collections/rackets/${racket.slug
                        .toLowerCase()
                        .replace(/ /g, "-")}`}
                      className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 transition-colors duration-200 ml-2"
                    >
                      <Info className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default LatestPaddleRacketHome;
