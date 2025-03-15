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
  console.log("seedDatabase starting...")
  let connection = await pool.getConnection();
  try {
    // 1. Create posts table if not exists
    await connection.query(`
      CREATE TABLE IF NOT EXISTS posts (
        slug VARCHAR(255) PRIMARY KEY,
        id VARCHAR(255),
        title TEXT,
        filePath TEXT,
        content TEXT,
        date_created_in DATETIME,
        description TEXT,
        keywords TEXT,
        author TEXT,
        canonicalUrl TEXT,
        metaRobots TEXT,
        ogTitle TEXT,
        ogDescription TEXT,
        ogImage TEXT,
        twitterTitle TEXT,
        twitterDescription TEXT,
        twitterImage TEXT,
        structuredData TEXT,
        readTime VARCHAR(255)
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
    console.log("seed my database")
  } catch (err) {
    console.error("Error connecting:", err);
  } finally {
    connection.release();
  }
};

seedDatabase();

export default pool;
