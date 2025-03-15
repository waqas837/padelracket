export const fetchCache = "force-no-store";
import { NextResponse } from "next/server";
import { pipeline } from "stream";
import { promisify } from "util";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import slugify from "slugify"; // Import slugify for creating slugs
const pump = promisify(pipeline);

import { appendPostToSitemap } from "../../../lib/update-sitemap";
import pool from "../../../lib/db";

// Function to create a unique slug
async function createUniqueSlug(title) {
  let connection = await pool.getConnection();
  try {
    let slug = slugify(title, { lower: true, strict: true });
    // Check if the slug already exists
    const [rows] = await connection.query(
      "SELECT COUNT(*) AS count FROM posts WHERE slug = ?",
      [slug]
    );
    if (rows[0].count > 0) {
      // If it exists, append a UUID to make it unique
      slug = `${slug}-${uuidv4()}`;
    }
    return slug;
  } catch (error) {
    console.error("Error in createUniqueSlug:", error);
    throw error;
  } finally {
    connection.release();
  }
}

async function createNewPost(postData) {
  let connection = await pool.getConnection();
  try {
    const slug = await createUniqueSlug(postData.title); // Generate a unique slug
    let id = uuidv4();
    console.log("postData", postData)
    const [result] = await connection.query(
      `INSERT INTO posts (
        slug, id, title, filePath, content, date_created_in, description, keywords, author, 
        canonicalUrl, metaRobots, ogTitle, ogDescription, ogImage, twitterTitle, 
        twitterDescription, twitterImage, structuredData, readTime
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        slug, // Use slug as the primary key
        id,
        postData.title,
        postData.filePath,
        postData.content,
        new Date(),
        postData.description,
        postData.keywords,
        postData.author,
        postData.canonicalUrl,
        postData.metaRobots,
        postData.ogTitle,
        postData.ogDescription,
        postData.ogImage,
        postData.twitterTitle,
        postData.twitterDescription,
        postData.twitterImage,
        postData.structuredData,
        postData.readTime,
      ]
    );

    if (result.affectedRows) {
      console.log("Query executed successfully", result);
    }

    if (result.affectedRows) {
      try {
        // Fetch the inserted row using the slug
        const [rows] = await connection.query(
          "SELECT * FROM posts WHERE slug = ?",
          [slug]
        );

        if (rows.length > 0) {
          let { slug, title, content, date_created_in } = rows[0];
          await appendPostToSitemap({
            slug,
            title,
            content,
            date_created_in,
          });
          console.log("Sitemap updated successfully");
          return { rows };
        } else {
          return "Check on this API, something went wrong.";
        }
      } catch (error) {
        console.error("Error in createNewPost:", error);
        console.error("Stack trace:", error.stack);
        return { success: false, errorStack: error.stack, error };
      } finally {
        connection.release();
      }
    }
  } catch (error) {
    console.error("Error in createNewPost:", error);
    return {
      message: "Error in createpost",
      success: false,
      errorStack: error.stack,
      error,
    };
  }
}

// API handler for POST requests
export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get("file");
    const uniqueId = Date.now(); // Unique identifier based on the current timestamp
    const myfile = `./public/files/${uniqueId}-${file.name}`;
    await pump(file.stream(), fs.createWriteStream(myfile));
    let filePath = `/files/${uniqueId}-${file.name}`;
    // Extract all fields from formData
    const postData = {
      title: data.get("title"),
      filePath,
      content: data.get("content"),
      description: data.get("description"),
      keywords: data.get("keywords"),
      author: data.get("author"),
      canonicalUrl: data.get("canonicalUrl"),
      metaRobots: data.get("metaRobots"),
      ogTitle: data.get("ogTitle"),
      ogDescription: data.get("ogDescription"),
      ogImage: data.get("ogImage"),
      twitterTitle: data.get("twitterTitle"),
      twitterDescription: data.get("twitterDescription"),
      twitterImage: data.get("twitterImage"),
      structuredData: data.get("structuredData"),
      structuredData: data.get("readTime"),
    };

    // Call the function to create a new post
    const response = await createNewPost(postData);

    return NextResponse.json({ success: true, response });
  } catch (error) {
    console.error("Error handling POST request:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
