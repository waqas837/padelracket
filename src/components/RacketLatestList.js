import pool from "@/lib/db";
import Link from "next/link";
import LatestPaddleRacketHome from "./Cards/LatestPaddleRacketHome";

// Fetch the latest rackets from the database
const getLatestRackets = async () => {
  let connection = await pool.getConnection();
  try {
    // Disable caching for this query
    await connection.query("SET SESSION query_cache_type = OFF;");

    // Fetch the latest rackets
    let [results] = await connection.query(
      "SELECT * FROM posts ORDER BY date_created_in DESC LIMIT 10;"
    );

    // console.log("Fetched rackets:", results); // Log the fetched data

    if (results.length > 0) {
      return results;
    } else {
      return undefined;
    }
  } catch (error) {
    console.error("Error fetching rackets:", error);
    return undefined;
  } finally {
    if (connection) connection.release(); // Ensure the connection is released
  }
};

const RacketLatestList = async () => {
  const rackets = await getLatestRackets(); // Fetch data dynamically

  return (
    <section className="my-32 px-6">
      {/* Latest paddle rackets section */}
      <LatestPaddleRacketHome rackets={rackets} />

      {/* Show All Button */}
      <div className="text-center mt-10">
        <Link
          href="/collections/rackets"
          className="border border-black text-black px-6 py-2 shadow-md inline-flex items-center justify-center gap-2 transition-all duration-300 group hover:gap-4 hover:bg-black hover:text-white"
        >
          Show All
          <span className="transition-transform duration-300 transform translate-x-0 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </section>
  );
};

export default RacketLatestList;
