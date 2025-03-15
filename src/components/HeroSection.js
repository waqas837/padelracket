const HeroSection = () => {
  const brands = [
    { name: "Adidas", img: "/nox.png" },
    { name: "Babolat", img: "/head.png" },
    { name: "Wilson", img: "/wilson.png" },
    { name: "Head", img: "/bullpad.png" },
    { name: "Nox", img: "/adidas.png" },
  ];
  return (
    <section className="bg-gray-100 p-1">
      <div className="h-96 flex justify-center items-center my-10 px-6">
        {/* Background Wrapper with Padding & Rounded Corners */}
        <div className="w-full h-full relative flex items-center justify-center overflow-hidden rounded-3xl p-2">
          {/* Background Image with Blur Effect */}
          <div className="absolute inset-0 bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat blur-xs rounded-3xl"></div>
          {/* Dark Overlay for Better Contrast */}
          <div className="absolute inset-0 bg-black/60 rounded-3xl"></div>
          {/* Content (Perfectly Centered) */}
          <div className="relative z-10 text-white text-center flex flex-col items-center justify-center h-full">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Find Your Next Racket
            </h1>
            <p className="text-lg sm:text-xl mt-2">
              Your winning shot starts with the racket that best suits your
              game.
            </p>
          </div>
        </div>
      </div>
      <div className="text-center">
        <p className="text-gray-500">
          Spotlight on the world-class padel brands
        </p>
        {/* Brand images list */}
        <div className="flex flex-wrap justify-center items-center gap-6">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="w-52 h-w-52 p-2 flex items-center justify-center my-10"
            >
              <img
                src={brand.img}
                alt={brand.name}
                className="max-w-full h-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
