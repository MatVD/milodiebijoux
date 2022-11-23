import Image from 'next/image'
import React from 'react'
import client from '../../../client/client'
import { Context, Products } from '../../../typings'

type Props = {
  productDetails: Products,
  productsDetails: Products[]
}

// This function gets called at build time
export async function getStaticPaths() {
  const productsDetails = await client.fetch(`*[_type == "product" ]{
    title,
    slug {
      current
    }
  }`)

  console.log(productsDetails)
  
  // Get the paths we want to pre-render based on product
  const paths = productsDetails.map(({productDetails}: Props) => ({
    params: { slug: productDetails.slug.current },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: 'blocking' }
}

// This also gets called at build time
export async function getStaticProps({ params } : Context) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const productsDetails = await client.fetch(`*[_type == "product" && ${params.slug} ]{
    title,
    _id,
    price,
    currency,
    slug {
      current
    },
    "image": image.asset._ref,
    "description": body.fr[0].children[1].text
  }`)
  
  // Pass post data to the page via props
  return { 
    props: { productsDetails } 
  }
}


const productDetails = ({productsDetails}: Props) => {
  return (
    <section >
          {productsDetails.map((productDetails: any) => (
            <div key={productDetails.id} >
              <h2>{productDetails.title}</h2>
                <Image
                  src={productDetails.image}
                  alt="Détails produits"
                  width={350}
                  height={280}
                />
            </div>
          ))}
        </section>
  )
}

export default productDetails