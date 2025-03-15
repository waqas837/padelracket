// app/api/seo/route.js
import pool from "@/lib/db";

export async function POST(req) {
  let connection = await pool.getConnection();
  try {
    const data = await req.json(); // Parse incoming data

    const {
      title,
      description,
      keywords,
      canonical,
      ogTitle,
      ogDescription,
      ogUrl,
      ogImage,
      twitterTitle,
      twitterDescription,
      twitterImage,
      structuredData, // New field for JSON data
    } = data;

    // Create the table if it does not exist, with a new column for JSON data
    await connection.query(`
        CREATE TABLE IF NOT EXISTS seo_settings (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT,
          keywords TEXT,
          canonical VARCHAR(255),
          ogTitle VARCHAR(255),
          ogDescription TEXT,
          ogUrl VARCHAR(255),
          ogImage VARCHAR(255),
          twitterTitle VARCHAR(255),
          twitterDescription TEXT,
          twitterImage VARCHAR(255),
          structuredData JSON,  
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

    // Insert data into the database
    const [result] = await connection.query(
      "INSERT INTO seo_settings (title, description, keywords, canonical, ogTitle, ogDescription, ogUrl, ogImage, twitterTitle, twitterDescription, twitterImage, structuredData) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        title,
        description,
        keywords,
        canonical,
        ogTitle,
        ogDescription,
        ogUrl,
        ogImage,
        twitterTitle,
        twitterDescription,
        twitterImage,
        JSON.stringify(structuredData), // Convert the JSON object to a string
      ]
    );

    return new Response(JSON.stringify({ success: true, result }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error saving SEO data:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  } finally {
    connection.release(); // Release the database connection
  }
}
