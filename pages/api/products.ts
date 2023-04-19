import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '../../lib/database';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method === 'GET') {
    try {
      const products = await query({
        query: "SELECT * FROM `products`",
        values: [] = []
      }) 
      res.status(200).json(products);
    } catch (error : any) {
      res.status(500).json( error.message );
    }
  }
};