import React from "react";
import { Products } from "../../typings";
import { Context } from "../../typings";
import client from "../../client/client";
import Image from "next/image";
import styles from "../../styles/Products.module.css";
import Link from "next/link";

export const getStaticProps = async (context: Context) => {
  const products =
    await client.fetch(`*[_type == "product" && categories[0]._ref == 'cb5a0a5c-aaa2-420e-b4e7-8fec70bc3aa9' ]{
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

const Bracelets = ({ products }: Props) => {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Bracelets</h1>
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

export default Bracelets;
