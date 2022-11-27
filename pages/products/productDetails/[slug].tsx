import { GetStaticProps } from "next";
import Image from "next/image";
import React, { useState, useContext } from "react";
import client from "../../../client/client";
import { Products } from "../../../typings";
import styles from "../../../styles/ProductDetails.module.css";
import Button from "../../../components/Button";
import { useStateContext } from "../../../context/context";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Cart from "../../../components/Cart";

export async function getStaticPaths() {
  const productsDetails = await client.fetch(`*[_type == "product" ]{
    title,
    slug {
      current
    }
  }`);

  const paths = productsDetails.map((productDetails: Products) => ({
    params: { slug: productDetails.slug.current },
  }));

  return { paths, fallback: "blocking" };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "product" && slug.current == $slug][0]{
    title,
    _id,
    price,
    currency,
    slug {
      current
    },
    "images": images[].asset->url,
    "description": body.fr[0].children[1].text
  }`;

  const productDetails = await client.fetch(query, {
    slug: params?.slug,
  });

  return { props: { productDetails } };
};

interface Props {
  productDetails: Products;
}

const ProductDetails = ({ productDetails }: Props) => {
  const [index, setIndex] = useState(0);
  const { onAdd, qty, incQty, decQty, setShowCart, showCart, setCartItems } = useStateContext();


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
            src={productDetails.images && productDetails?.images[index]}
            alt="Détails produits"
            width={350}
            height={280}
          />
          <div className={styles.smallImagesContainer}>
            {productDetails.images?.map((image, i) => (
              <div key={i}>
                <Image
                  alt="Autres images du produit"
                  width={70}
                  height={70}
                  src={image}
                  className={
                    i === index
                      ? `${styles.smallImage} ${styles.selectedImage}`
                      : styles.smallImage
                  }
                  onClick={() => setIndex(i)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.wrapperProductDetailsInfos}>
          <h3>Details: </h3>
          <p>{productDetails.description}</p>
          <p className={styles.price}>
            {productDetails.price} {productDetails.currency}
          </p>
          <div className={styles.quantity}>
            <h4>Quantité: </h4>
            <div className={styles.quantityDesc}>
              <span className={styles.minus} onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className={styles.num}>{qty}</span>
              <span className={styles.plus} onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </div>
          </div>
          <button type="button" onClick={() => onAdd(productDetails!, qty)}>
                  Ajouter au panier
          </button>
          <button type="button" onClick={() => setShowCart(true)}>
                  Voir le panier
          </button>
          {
            showCart && <Cart/>
          }
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
