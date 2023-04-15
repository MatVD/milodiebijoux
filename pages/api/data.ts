import type { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'mysql2/promise';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    // create the connection to database
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'milodie'
  })

  try {
    const query: string = "SELECT * FROM `products`";
    const values: [] = [];
    const [result] = await connection.execute(query, values);
    connection.end();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
};