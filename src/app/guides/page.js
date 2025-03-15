export const dynamic = "force-dynamic";
import pool from "@/lib/db";
import { mywebsiteurl } from "@/lib/myurl";
import Image from "next/image";
import Link from "next/link";
export const metadata = {
  title: "Webcam test all blogs and guides",
  description:
    "All Blogs and guides listing about how to test Webcam, microphone and speaker tests and how run tests for your windows pc mac pc and mobile devices.",
  keywords: ["webcam test", "microphone test", "sound test"],
  openGraph: {
    title: "Webcam test all blogs and guides",
    description:
      "All Blogs and guides listing about how to test Webcam, microphone and speaker tests and how run tests for your windows pc mac pc and mobile devices",
    type: "website",
    url: "https://webcamtest.live/",
    image: "https://www.yourwebsite.com/og-image.jpg",
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourtwitterhandle",
    title: "Webcam test all blogs and guides",
    description:
      "All Blogs and guides listing about how to test Webcam, microphone and speaker tests and how run tests for your windows pc mac pc and mobile devices",
    image: "https://webcamtest.live/twitter-image.jpg",
  },
   // canonical: "https://webcamtest.live/canonical-url",
};
const Blog = async () => {
  const getallposts = async () => {
    let connection = await pool.getConnection();
    try {
      let [results] = await connection.query("SELECT * FROM posts");

      if (results.length > 0) {
        return results;
      } else {
        return undefined;
      }
    } catch (error) {
    } finally {
      connection.release();
    }
  };
  const posts = await getallposts();

  return (
    <>
      <section className="pb-10 dark:bg-dark lg:pb-20 p-10">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto mb-[60px] max-w-[510px] text-center lg:mb-20">
                <h1 className="mb-2 block text-3xl font-bold text-primary">
                  Our Guides
                </h1>
                <p className="text-base text-body-color dark:text-dark-6">
                  These guides will tell you how to use the each tool for
                  testing webcam, microphone and sound test.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {posts !== undefined &&
              posts.map((val, index) => (
                <BlogCard
                  key={index}
                  date={val.date_created_in.toLocaleString()}
                  CardTitle={val.title}
                  CardDescription={val.content}
                  image={val.filePath}
                  slug={val.slug}
                  readTime="3 mins"
                />
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;

const BlogCard = ({
  key,
  image,
  date,
  CardTitle,
  CardDescription,
  readTime,
  slug,
}) => {
  return (
    <Link href={`/guides/${slug}`}>
      <section className="mb-5 w-full shadow-md p-3">
        <div className="mb-5 overflow-hidden rounded-lg">
          <Image
            className="object-cover"
            alt="later on"
            src={`${mywebsiteurl}${image}`}
            width={320}
            height={320}
          />
        </div>
        <div>
          <span className="mb-3 inline-block rounded bg-primary py-1 text-center text-xs font-semibold leading-loose">
            {date}
          </span>
          <br />
          <h1 className="inline-block mb-4  text-xl font-semibold text-dark hover:text-primary dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
            {CardTitle}
          </h1>
          <p className="my-2">{readTime} read</p>
        </div>
      </section>
    </Link>
  );
};
