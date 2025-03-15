"use client";
import React, { useState } from "react";
import Head from "next/head";

const SEOSettings = () => {
  const [seoData, setSeoData] = useState({
    title: "",
    description: "",
    keywords: "",
    canonical: "",
    ogTitle: "",
    ogDescription: "",
    ogUrl: "",
    ogImage: "",
    twitterTitle: "",
    twitterDescription: "",
    twitterImage: "",
    structuredData: "", // State for JSON-LD structured data
  });

  const [loading, setLoading] = useState(false); // State for loading status
  const [message, setMessage] = useState(""); // State for success/error messages

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSeoData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state

    try {
      const response = await fetch("/api/seo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(seoData),
      });

      const result = await response.json();
      if (result.success) {
        setMessage("SEO data submitted successfully!");
      } else {
        setMessage("Failed to submit SEO data.");
      }
    } catch (error) {
      console.error("Error submitting SEO data:", error);
      setMessage("An error occurred while submitting SEO data.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="bg-white h-screen absolute inset-0">
      <h2>Meta Tags SEO Settings</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(seoData).map((key) => (
          <div key={key} className="mb-4">
            <label htmlFor={key} className="block font-medium text-gray-700">
              {key.charAt(0).toUpperCase() +
                key.slice(1).replace(/([A-Z])/g, " $1")}
            </label>
            {key !== "structuredData" ? (
              <input
                type="text"
                name={key}
                value={seoData[key]}
                onChange={handleChange}
                id={key}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                placeholder={`Enter ${key}`}
              />
            ) : (
              <textarea
                name={key}
                value={seoData[key]}
                onChange={handleChange}
                id={key}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                placeholder="Enter structured JSON-LD data"
                rows="4"
              ></textarea>
            )}
          </div>
        ))}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}

      <Head>
        <title>{seoData.title || "Default Title"}</title>
        <meta
          name="description"
          content={seoData.description || "Default description"}
        />
        <meta
          name="keywords"
          content={seoData.keywords || "default, keywords"}
        />
        <link
          rel="canonical"
          href={seoData.canonical || "https://yourwebsite.com/"}
        />
        <meta property="og:title" content={seoData.ogTitle || seoData.title} />
        <meta
          property="og:description"
          content={seoData.ogDescription || seoData.description}
        />
        <meta
          property="og:url"
          content={seoData.ogUrl || "https://yourwebsite.com/"}
        />
        <meta
          property="og:image"
          content={
            seoData.ogImage || "https://yourwebsite.com/images/default.png"
          }
        />
        <meta
          name="twitter:title"
          content={seoData.twitterTitle || seoData.title}
        />
        <meta
          name="twitter:description"
          content={seoData.twitterDescription || seoData.description}
        />
        <meta
          name="twitter:image"
          content={seoData.twitterImage || seoData.ogImage}
        />

        {/* JSON-LD Structured Data */}
        {seoData.structuredData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: seoData.structuredData }}
          />
        )}
      </Head>
    </div>
  );
};

export default SEOSettings;
