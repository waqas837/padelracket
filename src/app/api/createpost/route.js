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
    console.log("postData", postData);

    const [result] = await connection.query(
      `INSERT INTO posts (
        slug, id, metaTitle, metaDescription, title, keywords, filePath, author, KeyFeatures, readTime, 
        ratings, price, productDescription, 
        Year, Level, Shape, Type, forGender, Face, Weight, FrameThickness, Balance, 
        power, control, rebound, maneuverability, SweetSpot, amazonLink, date_created_in
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ? )`,
      [
        slug,
        id,
        postData.metaTitle,
        postData.metaDescription,
        postData.title,
        postData.keywords,
        postData.filePath,
        postData.author,
        postData.KeyFeatures,
        postData.readTime,

        // Product Details
        postData.ratings,
        postData.price,
        postData.productDescription,

        // Specifications
        postData.Year,
        postData.Level,
        postData.Shape,
        postData.Type,
        postData.forGender,
        postData.Face,
        postData.Weight,
        postData.FrameThickness,
        postData.Balance,

        // Performance Metrics
        postData.power,
        postData.control,
        postData.rebound,
        postData.maneuverability,
        postData.SweetSpot,
        postData.amazonLink,
        new Date(), // Timestamp
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
      metaTitle: data.get("metaTitle"),
      filePath,
      amazonLink: data.get("amazonLink"),
      metaDescription: data.get("metaDescription"),
      title: data.get("title"),
      keywords: data.get("keywords"),
      author: data.get("author"),
      KeyFeatures: data.get("KeyFeatures"),
      readTime: data.get("readTime"),

      // Product Details
      ratings: data.get("ratings"),
      price: data.get("price"),
      productDescription: data.get("productDescription"),

      // Specifications
      Year: data.get("Year"),
      Level: data.get("Level"),
      Shape: data.get("Shape"),
      Type: data.get("Type"),
      forGender: data.get("forGender"),
      Face: data.get("Face"),
      Weight: data.get("Weight"),
      FrameThickness: data.get("FrameThickness"),
      Balance: data.get("Balance"),

      // Performance Metrics
      power: data.get("power"),
      control: data.get("control"),
      rebound: data.get("rebound"),
      maneuverability: data.get("maneuverability"),
      SweetSpot: data.get("SweetSpot"),
    };

    // Call the function to create a new post
    const response = await createNewPost(postData);

    return NextResponse.json({ success: true, response });
  } catch (error) {
    console.error("Error handling POST request:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
