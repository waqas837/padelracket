import pool from "@/lib/db";

const fetchSinglePost = async (slug) => {
  let connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(
      "SELECT * FROM posts WHERE slug = ?",
      [slug]
    );
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.log("error", error);
  } finally {
    connection.release();
  }
};

export default fetchSinglePost;
