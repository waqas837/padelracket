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
  const [metaTitle, setmetaTitle] = useState("");
  const [metaDescription, setmetaDescription] = useState("");
  const [title, setTitle] = useState("");
  const [keywords, setKeywords] = useState("");
  const [author, setAuthor] = useState("");
  const [readTime, setreadTime] = useState(0);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [mounted, setMounted] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setloading] = useState(false);
  // extra parameters
  const [ratings, setratings] = useState("");
  const [price, setprice] = useState("");
  const [productDescription, setproductDescription] = useState("");
  // Specifications
  const [Year, setYear] = useState("");
  const [Level, setLevel] = useState("");
  const [Shape, setShape] = useState("");
  const [Type, setType] = useState("");
  const [forGender, setforGender] = useState("");
  const [Face, setFace] = useState("");
  const [Weight, setWeight] = useState("");
  const [FrameThickness, setFrameThickness] = useState("");
  const [Balance, setBalance] = useState("");
  // Performance Metrics
  const [power, setpower] = useState("");
  const [control, setcontrol] = useState("");
  const [rebound, setrebound] = useState("");
  const [maneuverability, setmaneuverability] = useState("");
  const [SweetSpot, setSweetSpo] = useState("");
  const [amazonLink, setamazonLink] = useState("");
  // For Key Features we use the rich text editor

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

    const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    const newPostData = {
      metaTitle,
      metaDescription,
      title,
      keywords,
      author,
      KeyFeatures: content,
      readTime,
      // Product Details
      ratings,
      price,
      productDescription,
      // Specifications
      Year,
      Level,
      Shape,
      Type,
      forGender,
      Face,
      Weight,
      FrameThickness,
      Balance,
      // Performance Metrics
      power,
      control,
      rebound,
      maneuverability,
      SweetSpot,
      amazonLink
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
        Upload a new Racket product
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
            Post Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label
            className="block text-gray-700 font-medium mb-1"
            htmlFor="metaTitle"
          >
            Meta Title
          </label>
          <input
            id="metaTitle"
            type="text"
            value={metaTitle}
            onChange={(e) => setmetaTitle(e.target.value)}
            placeholder="Enter meta title"
            className={`w-full p-2 border ${
              errors.metaTitle ? "border-red-500" : "border-gray-300"
            } rounded-lg`}
          />
        </div>
        <div>
          <label
            className="block text-gray-700 font-medium mb-1"
            htmlFor="file"
          >
            Racket image/featured image
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
            htmlFor="metaTitle"
          >
            Amazon Link
          </label>
          <input
            id="metaTitle"
            type="text"
            value={amazonLink}
            onChange={(e) => setamazonLink(e.target.value)}
            placeholder="Enter Amazon Link"
            className={`w-full p-2 border ${
              errors.metaTitle ? "border-red-500" : "border-gray-300"
            } rounded-lg`}
          />
        </div>
        <div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="metaDescription"
            >
              Meta Description
            </label>
            <textarea
              id="metaDescription"
              value={metaDescription}
              onChange={(e) => setmetaDescription(e.target.value)}
              placeholder="Enter meta description"
              className="w-full p-2 border border-gray-300 rounded-lg"
            ></textarea>
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
              placeholder="Enter keywords"
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
              placeholder="Enter author name"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="readTime"
            >
              Read Time
            </label>
            <input
              id="readTime"
              type="number"
              value={readTime}
              onChange={(e) => setreadTime(e.target.value)}
              placeholder="Enter read time (minutes)"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Extra Parameters */}
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="ratings"
            >
              Ratings
            </label>
            <input
              id="ratings"
              type="text"
              value={ratings}
              onChange={(e) => setratings(e.target.value)}
              placeholder="Enter ratings"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="price"
            >
              Price
            </label>
            <input
              id="price"
              type="text"
              value={price}
              onChange={(e) => setprice(e.target.value)}
              placeholder="Enter price"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="productDescription"
            >
              Product Description
            </label>
            <textarea
              id="productDescription"
              value={productDescription}
              onChange={(e) => setproductDescription(e.target.value)}
              placeholder="Enter product description"
              className="w-full p-2 border border-gray-300 rounded-lg"
            ></textarea>
          </div>

          {/* Specifications */}
          {[
            { label: "Year", state: Year, setState: setYear },
            { label: "Level", state: Level, setState: setLevel },
            { label: "Shape", state: Shape, setState: setShape },
            { label: "Type", state: Type, setState: setType },
            { label: "For Gender", state: forGender, setState: setforGender },
            { label: "Face", state: Face, setState: setFace },
            { label: "Weight", state: Weight, setState: setWeight },
            {
              label: "Frame Thickness",
              state: FrameThickness,
              setState: setFrameThickness,
            },
            { label: "Balance", state: Balance, setState: setBalance },
          ].map(({ label, state, setState }) => (
            <div key={label}>
              <label
                className="block text-gray-700 font-medium mb-1"
                htmlFor={label}
              >
                {label}
              </label>
              <input
                id={label}
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder={`Enter ${label}`}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
          ))}

          {/* Performance Metrics */}
          {[
            { label: "Power", state: power, setState: setpower },
            { label: "Control", state: control, setState: setcontrol },
            { label: "Rebound", state: rebound, setState: setrebound },
            {
              label: "Maneuverability",
              state: maneuverability,
              setState: setmaneuverability,
            },
            { label: "Sweet Spot", state: SweetSpot, setState: setSweetSpo },
          ].map(({ label, state, setState }) => (
            <div key={label}>
              <label
                className="block text-gray-700 font-medium mb-1"
                htmlFor={label}
              >
                {label}
              </label>
              <input
                id={label}
                type="number"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder={`Enter ${label}`}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
          ))}
        </div>

        {mounted && (
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Key Features
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
    </div>
  );
}
