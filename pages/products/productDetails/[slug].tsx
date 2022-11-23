import { GetStaticProps } from "next";
import Image from "next/image";
import React from "react";
import client from "../../../client/client";
import { Products } from "../../../typings";
import styles from "../../../styles/ProductDetails.module.css";
import Button from "../../../components/Button";


// This function gets called at build time
export async function getStaticPaths() {
  const productsDetails = await client.fetch(`*[_type == "product" ]{
    title,
    slug {
      current
    }
  }`);

  // Get the paths we want to pre-render based on product
  const paths = productsDetails.map((productDetails: Products) => ({
    params: {
      slug: productDetails.slug.current,
    },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { 
    paths, 
    fallback: "blocking" 
  };
}

// This also gets called at build time
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const query = `*[_type == "product" && slug.current == $slug][0]{
    title,
    _id,
    price,
    currency,
    slug {
      current
    },
    "image": image.asset->url,
    "description": body.fr[0].children[1].text
  }`;

  const productDetails = await client.fetch(query, {
    slug: params?.slug,
  });

  // Pass post data to the page via props
  return {
    props: { productDetails },
  };
};

interface Props {
  productDetails: Products;
}

const productDetails = ({ productDetails }: Props) => {
  console.log(productDetails);

  return (
    <>
      <h1 className={styles.productDetailsH1}>Détails produit</h1>
      <section
        key={productDetails._id}
        className={styles.sectionProductDetails}
      >
        <div>
          <h2>{productDetails.title}</h2>
          <Image
            src={productDetails.image}
            alt="Détails produits"
            width={350}
            height={280}
          />
        </div>
        <div>
          <p>{productDetails.description}</p>
          <p>{productDetails.price} {productDetails.currency}</p>
          {/* <Button label="Ajouter au panier" /> */}
        </div>
      </section>
    </>
  );
};

export default productDetails;
