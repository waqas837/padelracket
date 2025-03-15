import Link from "next/link";

const rackets = [
  {
    name: "Adidas Metalbone",
    img: "/rackets/adidas-metalbone.png",
    price: "$299",
    rating: 4.8,
    year: 2024,
  },
  {
    name: "Babolat Viper",
    img: "/rackets/babolat-viper.png",
    price: "$249",
    rating: 4.6,
    year: 2023,
  },
  {
    name: "Wilson Bela Pro",
    img: "/rackets/wilson-bela-pro.png",
    price: "$279",
    rating: 4.9,
    year: 2024,
  },
  {
    name: "Head Delta Pro",
    img: "/rackets/head-delta-pro.png",
    price: "$259",
    rating: 4.7,
    year: 2023,
  },
];

const RacketLatestList = () => {
  return (
    <section className="my-32 px-6">
      <h2 className="text-center text-3xl font-bold text-gray-800 mb-10">
        Latest Padel Rackets
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-center">
        {rackets.map((racket, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 text-center transition-transform transform hover:scale-105"
          >
            <img
              src={racket.img}
              alt={racket.name}
              className="w-full h-32 object-contain mx-auto"
            />
            <h3 className="text-lg font-semibold mt-3">{racket.name}</h3>
            <p className="text-gray-600">{racket.price}</p>
            <p className="text-gray-500 text-sm">Year: {racket.year}</p>

            {/* Rating Stars */}
            <div className="flex justify-center items-center mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`text-yellow-400 text-xl ${
                    i < Math.round(racket.rating) ? "opacity-100" : "opacity-30"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Show All Button */}
      <div className="text-center mt-10">
        {/* Show All Button */}
        <div className="mt-10">
          <Link
            href="/collections/rackets"
            className="border border-black text-black px-6 py-2 shadow-md inline-flex items-center justify-center gap-2 transition-all duration-300 group hover:gap-4"
          >
            Show All
            <span className="transition-transform duration-300 transform translate-x-0 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RacketLatestList;
