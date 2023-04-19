import mysql from 'mysql2/promise';

interface DatabaseProps {
  query: string;
  values: []
}

export async function query({query, values = []}: DatabaseProps) {
  // create the connection to database
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE
  })

  try {
    const [result] = await connection.execute(query, values);
    connection.end();
    return result;
  } catch (error: any) {
    throw Error(error.message);
  }
}