import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ title, subtitle, image, link, category }) => {
  return (
    <Link
      href={link}
      className="block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition"
    >
      <div className="relative h-60">
        <img
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="brightness-75"
        />
        <div className="absolute inset-0 flex flex-col justify-end p-4">
          <span className="text-sm text-white font-semibold">{category}</span>
          <h3 className="text-white text-2xl font-bold leading-tight">
            {title}
          </h3>
        </div>
      </div>
      <div className="p-4">
        <p className="text-gray-600">{subtitle}</p>
      </div>
    </Link>
  );
};

const BlogBuyerGuide = () => {
  const articles = [
    {
      title: "Best Padel Rackets for Intermediate Players [2024]",
      subtitle: "The best padel racket for intermediate players.",
      image: "/images/intermediate-rackets.jpg",
      link: "/blog/intermediate-rackets",
      category: "Best",
    },
    {
      title: "How To Choose Padel Shoes: Expert Tips for Optimal Performance",
      subtitle: "Learn how to choose the best padel shoes for your game.",
      image: "/images/padel-shoes.jpg",
      link: "/blog/padel-shoes",
      category: "How to",
    },
    {
      title: "How To Choose A Padel Racket: Tips For The Perfect Selection",
      subtitle:
        "A guide to help you choose the best padel racket for your game.",
      image: "/images/padel-racket.jpg",
      link: "/blog/padel-racket",
      category: "How to",
    },
    {
      title: "The 5 Best Padel Rackets of 2024",
      subtitle: "Discover top padel rackets for 2024. Find your perfect match!",
      image: "/images/best-rackets.jpg",
      link: "/blog/best-rackets",
      category: "Best",
    },
  ];

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Buyer's Guide</h2>
        <p className="text-gray-600 mb-8">
          Each season, we collaborate with world-class professionals to create
          guides tailored to each player.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article, index) => (
            <BlogCard key={index} {...article} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogBuyerGuide;
