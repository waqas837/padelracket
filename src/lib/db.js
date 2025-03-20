import mysql from "mysql2/promise";

// Create a pool of connections
const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DB,
  waitForConnections: true,
  connectionLimit: 10, // Adjust as needed
  queueLimit: 0,
});

// seed database
const seedDatabase = async () => {
  console.log("seedDatabase starting...");
  let connection = await pool.getConnection();
  try {
    // 1. Create posts table if not exists
    await connection.query(`
      CREATE TABLE IF NOT EXISTS posts (
        slug VARCHAR(255) PRIMARY KEY,
        id VARCHAR(255),
        metaTitle VARCHAR(255),
        metaDescription TEXT,
        title TEXT,
        keywords TEXT,
        filePath TEXT,
        author TEXT,
        KeyFeatures TEXT,
        readTime VARCHAR(255),

       
        ratings VARCHAR(50),
        price VARCHAR(50),
        productDescription TEXT,

     
        Year VARCHAR(50),
        Level VARCHAR(50),
        Shape VARCHAR(50),
        Type VARCHAR(50),
        forGender VARCHAR(50),
        Face VARCHAR(50),
        Weight VARCHAR(50),
        FrameThickness VARCHAR(50),
        Balance VARCHAR(50),

       
        power VARCHAR(50),
        control VARCHAR(50),
        rebound VARCHAR(50),
        maneuverability VARCHAR(50),
        SweetSpot VARCHAR(50),
        amazonLink TEXT,
        date_created_in DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 2. Create seo_settings table if not exists
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

    console.log("Database seeded successfully!");
  } catch (err) {
    console.error("Error connecting:", err);
  } finally {
    if (connection) connection.release();
  }
};

seedDatabase();

export default pool;
