export const fetchCache = "force-no-store";
import { NextResponse } from "next/server";
import pool from "../../../lib/db";

// Function to create a unique slug
async function getAllPosts() {
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
    if (connection) connection.release(); // Ensure the connection is released
  }
}

// API handler for GET ALL POST WITH pagination
export async function GET() {
  try {
    let response = await getAllPosts();
    return NextResponse.json({ success: true, response });
  } catch (error) {
    console.error("Error handling POST request:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
