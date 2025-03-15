"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import toast, { Toaster } from "react-hot-toast";
// Dynamically import the Editor component with SSR disabled
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [author, setAuthor] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [metaRobots, setMetaRobots] = useState("index, follow"); // Default value
  const [ogTitle, setOgTitle] = useState("");
  const [ogDescription, setOgDescription] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [twitterTitle, setTwitterTitle] = useState("");
  const [twitterDescription, setTwitterDescription] = useState("");
  const [twitterImage, setTwitterImage] = useState("");
  const [readTime, setreadTime] = useState(0);
  const [structuredData, setStructuredData] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [mounted, setMounted] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setloading] = useState(false);

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    canonicalUrl: "",
    ogTitle: "",
    ogDescription: "",
    twitterTitle: "",
    twitterDescription: "",
    structuredData: "",
  });

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setMounted(true);
    }

    return () => {
      isMounted = false;
    };
  }, []);
  const imageMap = useRef(new Map());
  const validateFields = () => {
    const newErrors = {
      title: title ? "" : "Title is required.",
      description: description ? "" : "Description is required.",
      canonicalUrl: canonicalUrl ? "" : "Canonical URL is required.",
      ogTitle: ogTitle ? "" : "Open Graph title is required.",
      ogDescription: ogDescription ? "" : "Open Graph description is required.",
      twitterTitle: twitterTitle ? "" : "Twitter card title is required.",
      twitterDescription: twitterDescription
        ? ""
        : "Twitter card description is required.",
      structuredData: structuredData ? "" : "Structured data is required.",
      readTime: readTime ? "" : "Structured data is required.",
    };

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  };

  const onEditorStateChange = useCallback(
    (newEditorState) => {
      if (mounted) {
        setEditorState(newEditorState);
      }
    },
    [mounted]
  );

  const uploadCallback = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const localUrl = e.target.result;
        const uniqueId = Date.now().toString();
        imageMap.current.set(uniqueId, { file, localUrl });
        resolve({ data: { link: localUrl, id: uniqueId } });
      };
      reader.readAsDataURL(file);
    });
  };

  const submitPost = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!validateFields()) {
      toast.error("Fill all fields");

      return;
    }

    const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    const newPostData = {
      title,
      description,
      // file,
      keywords,
      author,
      canonicalUrl,
      metaRobots,
      ogTitle,
      ogDescription,
      ogImage,
      twitterTitle,
      twitterDescription,
      twitterImage,
      structuredData,
      content,
      readTime,
    };

    try {
      const formData = new FormData();
      // Append article title and content
      Object.entries(newPostData).forEach(([key, value]) => {
        formData.append(
          key,
          typeof value === "object" ? JSON.stringify(value) : value
        );
      });
      formData.append("file", file);
      toast.loading("Post creating...");
      // function to create a post
      let response = await fetch("api/createpost", {
        method: "POST",
        body: formData,
      });
      console.log("New post created response:", response);
      toast.dismiss();
      if (response.ok) {
        toast.success("Post Created");
      } else {
        toast.error("Error in creating post.");
      }
    } catch (error) {
      toast.error("Post failed to create");
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Create a New Post
      </h1>
      <form
        onSubmit={submitPost}
        encType="multipart/form-data"
        className="space-y-4"
      >
        <div>
          <label
            className="block text-gray-700 font-medium mb-1"
            htmlFor="title"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            className={`w-full p-2 border ${
              errors.title ? "border-red-500" : "border-gray-300"
            } rounded-lg`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
        </div>
        <div>
          <label
            className="block text-gray-700 font-medium mb-1"
            htmlFor="description"
          >
            Meta Description
          </label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter post description"
            className={`w-full p-2 border ${
              errors.description ? "border-red-500" : "border-gray-300"
            } rounded-lg`}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>
        <div>
          <label
            className="block text-gray-700 font-medium mb-1"
            htmlFor="file"
          >
            Any File Upload
          </label>
          <input
            id="file"
            type="file"
            name="file"
            onChange={(e) => setFile(e.target.files[0])}
            placeholder="Enter post description"
          />
        </div>
        <div>
          <label
            className="block text-gray-700 font-medium mb-1"
            htmlFor="keywords"
          >
            Keywords
          </label>
          <input
            id="keywords"
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="Enter post keywords"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label
            className="block text-gray-700 font-medium mb-1"
            htmlFor="author"
          >
            Author
          </label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter author's name"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label
            className="block text-gray-700 font-medium mb-1"
            htmlFor="canonicalUrl"
          >
            Canonical URL
          </label>
          <input
            id="canonicalUrl"
            type="text"
            value={canonicalUrl}
            onChange={(e) => setCanonicalUrl(e.target.value)}
            placeholder="Enter canonical URL"
            className={`w-full p-2 border ${
              errors.canonicalUrl ? "border-red-500" : "border-gray-300"
            } rounded-lg`}
          />
          {errors.canonicalUrl && (
            <p className="text-red-500 text-sm">{errors.canonicalUrl}</p>
          )}
        </div>
        <div>
          <label
            className="block text-gray-700 font-medium mb-1"
            htmlFor="metaRobots"
          >
            Meta Robots
          </label>
          <input
            id="metaRobots"
            type="text"
            value={metaRobots}
            onChange={(e) => setMetaRobots(e.target.value)}
            placeholder="Meta robots directives (e.g., index, follow)"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label
            className="block text-gray-700 font-medium mb-1"
            htmlFor="ogTitle"
          >
            Open Graph Title
          </label>
          <input
            id="ogTitle"
            type="text"
            value={ogTitle}
            onChange={(e) => setOgTitle(e.target.value)}
            placeholder="Open Graph title"
            className={`w-full p-2 border ${
              errors.ogTitle ? "border-red-500" : "border-gray-300"
            } rounded-lg`}
          />
          {errors.ogTitle && (
            <p className="text-red-500 text-sm">{errors.ogTitle}</p>
          )}
        </div>
        <div>
          <label
            className="block text-gray-700 font-medium mb-1"
            htmlFor="ogDescription"
          >
            Open Graph Description
          </label>
          <input
            id="ogDescription"
            type="text"
            value={ogDescription}
            onChange={(e) => setOgDescription(e.target.value)}
            placeholder="Open Graph description"
            className={`w-full p-2 border ${
              errors.ogDescription ? "border-red-500" : "border-gray-300"
            } rounded-lg`}
          />
          {errors.ogDescription && (
            <p className="text-red-500 text-sm">{errors.ogDescription}</p>
          )}
        </div>
        <div>
          <label
            className="block text-gray-700 font-medium mb-1"
            htmlFor="ogImage"
          >
            Open Graph Image URL
          </label>
          <input
            id="ogImage"
            type="text"
            value={ogImage}
            onChange={(e) => setOgImage(e.target.value)}
            placeholder="Open Graph image URL"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label
            className="block text-gray-700 font-medium mb-1"
            htmlFor="twitterTitle"
          >
            Twitter Title
          </label>
          <input
            id="twitterTitle"
            type="text"
            value={twitterTitle}
            onChange={(e) => setTwitterTitle(e.target.value)}
            placeholder="Twitter card title"
            className={`w-full p-2 border ${
              errors.twitterTitle ? "border-red-500" : "border-gray-300"
            } rounded-lg`}
          />
          {errors.twitterTitle && (
            <p className="text-red-500 text-sm">{errors.twitterTitle}</p>
          )}
        </div>
        <div>
          <label
            className="block text-gray-700 font-medium mb-1"
            htmlFor="readTime"
          >
            Read TIME{" "}
          </label>
          <input
            id="readTime"
            type="number"
            value={readTime}
            onChange={(e) => setreadTime(e.target.value)}
            placeholder="in mins"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label
            className="block text-gray-700 font-medium mb-1"
            htmlFor="twitterDescription"
          >
            Twitter Description
          </label>
          <input
            id="twitterDescription"
            type="text"
            value={twitterDescription}
            onChange={(e) => setTwitterDescription(e.target.value)}
            placeholder="Twitter card description"
            className={`w-full p-2 border ${
              errors.twitterDescription ? "border-red-500" : "border-gray-300"
            } rounded-lg`}
          />
          {errors.twitterDescription && (
            <p className="text-red-500 text-sm">{errors.twitterDescription}</p>
          )}
        </div>
        <div>
          <label
            className="block text-gray-700 font-medium mb-1"
            htmlFor="twitterImage"
          >
            Twitter Image URL
          </label>
          <input
            id="twitterImage"
            type="text"
            value={twitterImage}
            onChange={(e) => setTwitterImage(e.target.value)}
            placeholder="Twitter card image URL"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label
            className="block text-gray-700 font-medium mb-1"
            htmlFor="structuredData"
          >
            Structured Data (JSON-LD)
          </label>
          <textarea
            id="structuredData"
            value={structuredData}
            onChange={(e) => setStructuredData(e.target.value)}
            placeholder="Enter structured data in JSON-LD format"
            rows="4"
            className={`w-full p-2 border ${
              errors.structuredData ? "border-red-500" : "border-gray-300"
            } rounded-lg`}
          />
          {errors.structuredData && (
            <p className="text-red-500 text-sm">{errors.structuredData}</p>
          )}
        </div>

        {mounted && (
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Content
            </label>
            <Editor
              editorState={editorState}
              onEditorStateChange={onEditorStateChange}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class border border-gray-300 rounded-lg"
              toolbarClassName="toolbar-class"
              toolbar={{
                options: [
                  "inline",
                  "blockType",
                  "fontSize",
                  "list",
                  "textAlign",
                  "colorPicker",
                  "link",
                  "embedded",
                  "emoji",
                  "image",
                  "remove",
                  "history",
                ],
                inline: {
                  inDropdown: false,
                  options: [
                    "bold",
                    "italic",
                    "underline",
                    "strikethrough",
                    "monospace",
                    "superscript",
                    "subscript",
                  ],
                },
                blockType: {
                  inDropdown: true,
                  options: [
                    "Normal",
                    "H1",
                    "H2",
                    "H3",
                    "H4",
                    "H5",
                    "H6",
                    "Blockquote",
                    "Code",
                  ],
                },
                fontSize: {
                  options: [
                    8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96,
                  ],
                },
                image: {
                  uploadEnabled: true,
                  uploadCallback: uploadCallback,
                  previewImage: true,
                  inputAccept:
                    "image/gif,image/jpeg,image/jpg,image/png,image/svg",
                  alt: { present: false, mandatory: false },
                  defaultSize: {
                    height: "auto",
                    width: "auto",
                  },
                },
              }}
            />
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          {loading ? "..." : "Submit Post"}
        </button>
      </form>

      <div className="mt-6 p-4 bg-gray-100 rounded-lg border border-gray-300">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">
          Meta Tags Preview
        </h2>
        <p className="text-gray-700">
          Here is how your meta tags will look in the HTML &lt;head&gt;:
        </p>
        <pre className="bg-gray-200 p-4 rounded-lg overflow-x-auto">
          {`<meta name="description" content="${description
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")}">
<meta name="keywords" content="${keywords
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")}">
<meta name="author" content="${author
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")}">
<link rel="canonical" href="${canonicalUrl
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")}">
<meta name="robots" content="${metaRobots
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")}">
<meta property="og:title" content="${ogTitle
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")}">
<meta property="og:description" content="${ogDescription
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")}">
<meta property="og:image" content="${ogImage
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")}">
<meta name="twitter:title" content="${twitterTitle
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")}">
<meta name="twitter:description" content="${twitterDescription
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")}">
<meta name="twitter:image" content="${twitterImage
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")}">
<script type="application/ld+json">
${structuredData.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
</script>`}
        </pre>
      </div>
    </div>
  );
}
