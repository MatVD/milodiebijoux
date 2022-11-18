import React, {useState} from 'react'
import client from '../../client/client'


export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const products = await client.fetch(`products`);

  // Get the paths we want to pre-render based on posts
  const paths = products.map((product: any) => ({
    params: { id: product },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

// getStaticProps => fetch data from sanity
export async function getStaticProps({params}: any) {
  const products = await client.fetch(`products/${params.id}`);
  
  
  return {
    props: {
      products
    }
  };
}

const Products = ({products}: any) => {

  return (
    <> 
      <h1>{}</h1>
      <ul>
        {
          // products.map((product: any) => (
          //   <li>{product.title}</li>
          // ))
        }
      </ul>
      
    </>
  )
}

export default Products