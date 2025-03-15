export const dynamic = "force-dynamic";
import RelatedPosts from "@/components/RelatedPosts";
import fetchSinglePost from "@/lib/fetchSinglePost";
import { mywebsiteurl } from "@/lib/myurl";
import Image from "next/image";

export async function generateMetadata({ params }) {
  const { slug } = params;
  const PostDetail = await fetchSinglePost(slug);
  return {
    title: PostDetail.title,
    description: PostDetail.description,
  };
}

const PostDetailsPage = async ({ params }) => {
  const { slug } = params;
  const PostDetail = await fetchSinglePost(slug);
   console.log(`${mywebsiteurl}${PostDetail.filePath}`)
  return (
    <div>
      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 dark:bg-gray-900 antialiased">
        <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
          <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <header className="mb-4 lg:mb-6 not-format">
              <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                {PostDetail.title}
              </h1>
            </header>
            <figure>
              <Image
                alt={PostDetail.title}
                src={`${mywebsiteurl}${PostDetail.filePath}`}
                width={300}
                height={300}
                className="w-full h-full"
              />
            </figure>
            {/* content */}
            <div dangerouslySetInnerHTML={{ __html: PostDetail.content }} />
          </article>
        </div>
      </main>

      <aside
        aria-label="Related articles"
        className="py-8 lg:py-24 bg-gray-50 dark:bg-gray-800 p-3"
      >
        <div className="px-4 mx-auto max-w-screen-xl">
          <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
            Related articles
          </h2>
          {/* RelatedPosts */}
          <RelatedPosts IamNOtInclude={PostDetail.id} />
        </div>
      </aside>
    </div>
  );
};

export default PostDetailsPage;
