import React from "react";
import { Products } from "../../typings";
import { Context } from "../../typings";
import client from "../../client/client";
import Image from "next/image";
import styles from "../../styles/Products.module.css";
import Link from "next/link";

export const getStaticProps = async (context: Context) => {
  const products =
    await client.fetch(`*[_type == "product" && categories[0]._ref == '01fe2fa7-36d5-493f-bdf8-cb9e740e51ba' ]{
    title,
    _id,
    slug {
      current
    },
    "images": images[].asset->url,
  }`);

  if (!products) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      products,
    },
  };
};

type Props = {
  products: [Products];
};

const MarquePages = ({ products }: Props) => {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Marques-pages</h1>
      <div className={styles.sectionProducts}>
        {products.map((product: any) => {
          return (
            <div key={product._id} className={styles.wrapperProducts}>
              <h2>{product.title}</h2>
              <Link href={`/products/productDetails/${product.slug.current}`}>
                <Image
                  src={product.images[0]}
                  width={300}
                  height={200}
                  alt="Boucles d'oreilles"
                />
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MarquePages;
