import Image from "next/image";

const categories = [
  { name: "PADEL RACKETS", image: "/racket.png" },
  { name: "BAGS", image: "/bag.png" },
  { name: "BALLS", image: "/balls.png" },
  { name: "PADEL ACCESSORIES", image: "/accessories.png" },
];

export default function ShopByCategory() {
  return (
    <section className="py-10 bg-white text-center">
      <h2 className="text-3xl font-semibold mb-6">Shop by Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4 max-w-7xl mx-auto">
        {categories.map((category, index) => (
          <div
            key={index}
            className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg"
          >
            <Image
              src={category.image}
              alt={category.name}
              width={300}
              height={300}
              className="w-full h-auto transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all">
              <span className="text-white font-bold text-lg">
                {category.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
