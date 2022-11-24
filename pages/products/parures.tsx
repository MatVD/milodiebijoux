import React from "react";
import { Products } from "../../typings";
import { Context } from "../../typings";
import client from "../../client/client";
import Image from "next/image";
import styles from "../../styles/Products.module.css";
import Link from "next/link";

export const getStaticProps = async (context: Context) => {
  const products =
    await client.fetch(`*[_type == "product" && categories[0]._ref == '52b57dc5-0844-4d7d-b0cb-0829447c20f8' ]{
    title,
    _id,
    slug {
      current
    },
    "images": image.asset->url
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

const Parures = ({ products }: Props) => {
  return (
    <div className={styles.sectionProducts}>
      {products.map((product: any) => {
        return (
          <div key={product._id} className={styles.wrapperProducts}>
            <h2>{product.title}</h2>
            <Link href={`/products/productDetails/${product.slug.current}`}>
              <Image
                src={product.images}
                width={300}
                height={200}
                alt="Boucles d'oreilles"
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Parures;
