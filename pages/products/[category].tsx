import React from "react";
import client from "../../client/client";
import Image from "next/image";
import styles from "../../styles/Products.module.css";
import Head from "next/head";

export async function getStaticPaths() {
  return {
    paths: [
      { params: { category: "boucles" } },
      { params: { category: "bracelets" } },
      { params: { category: "colliers" } },
      { params: { category: "marques-pages" } },
      { params: { category: "parures" } },
    ],
    fallback: false, // can also be true or 'blocking'
  };
}

// getStaticProps => fetch data from sanity
export async function getStaticProps() {
  const products = await client.fetch(`*[_type == "product" ]{
    title,
    "id": _id,
    "image": image.asset->url,
    "categories": categories[0]._ref
  }`);

  const categories = await client.fetch(`*[_type == "category" ]{
    title,
    "id": _id,
  }`);

  return {
    props: {
      products,
      categories,
    },
  };
}

const Products = ({ products, categories }: any) => {
  const categoriesId = categories.map((category: any) => category.id);

  return (
    <>
      <Head>
        <title>Milodie Bijoux - Page produits</title>
        <meta
          name="description"
          content="Milodie Bijoux - creation de bijoux"
        />
      </Head>
      <section className={styles.sectionProducts}>
        {products.map((product: any) => (
          <div key={product.id} className={styles.wrapperProducts}>
            <h1>{product.title}</h1>
            <Image
              className={styles.imagesProducts}
              src={product.image}
              alt="zefhvzloi"
              width={300}
              height={200}
              priority
            />
          </div>
        ))}
      </section>
    </>
  );
};

export default Products;
