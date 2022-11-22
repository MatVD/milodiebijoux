import Head from "next/head";
import client from "../client/client";
import styles from "../styles/Products.module.css";
import Image from "next/image";
import homeStyles from "../styles/Home.module.css";
import Logo from "../public/Logo.png";
import Button from "../components/Button";
import Link from "next/link";

// getStaticProps => fetch data from sanity
export async function getStaticProps() {
  const categories = await client.fetch(`*[_type == "category"]{
    title,
    "id": _id,
    slug {
      current
    },
    "image": image.asset->url,
  }`);


  const imagesBanner = await client.fetch(`*[_type == "imageBanner"]{
    title,
    "id": _id,
    slug {
      current
    },
    "image": image.asset->url,
  }`);

  console.log(imagesBanner)

  return {
    props: {
      categories,
      imagesBanner
    },
  };
}

export default function Home({ categories, imagesBanner }: any) {

  return (
    <>
      <Head>
        <title>Milodie Bijoux - Page d&apos;accueil</title>
        <meta
          name="description"
          content="Milodie Bijoux - creation de bijoux"
        />
      </Head>
      <>
        <section className={homeStyles.banner}>
          <Image
            className={homeStyles.imagesProductsBanner}
            src={imagesBanner[0].image}
            alt="zefhvzloi"
            fill
          />
        </section>
        <div className={homeStyles.wrapperImageAndCTA}>
          <div>
            <Image src={Logo} alt="Big logo" width={200} />
          </div>
          <div className={homeStyles.wrapperCTA}>
            <h1 className={homeStyles.h1}>
              Boucles d&apos;oreilles - Colliers - Bagues
            </h1>
            <h2>Parce que vous le valez bien !</h2>
            <Button />
          </div>
        </div>
        <hr className={homeStyles.hr} />

        <section className={homeStyles.sectionProducts}>
          {categories.map((category: any) => (
            <div key={category.id} className={homeStyles.wrapperProducts}>
              <h2>{category.title}</h2>
              <Link href={`/products/${category.slug.current}`}>
                <Image
                  className={homeStyles.imagesProducts}
                  src={category.image}
                  alt="zefhvzloi"
                  width={350}
                  height={280}
                />
              </Link>
            </div>
          ))}
        </section>

        <section className={homeStyles.sectionLivraison}>
          <h2>Livraison</h2>
          <p>Offerte pour une commande de plus de 10000€</p>
          <Button />
        </section>

        <section>
          <h2 style={{ textAlign: "center" }}>Avis</h2>
          <div className={homeStyles.sectionAvis}>
            <div className={homeStyles.avis1}>
              <div className={homeStyles.initialCircle}>MV</div>
              <p className={homeStyles.initialText}>
                Ces bijoux sont magnifique ! Un coups de coeur pour cette
                créatrice
              </p>
            </div>
            <div className={homeStyles.avis2}>
              <div className={homeStyles.initialCircle}>MV</div>
              <p className={homeStyles.initialText}>
                Ces bijoux sont magnifique ! Un coups de coeur pour cette
                créatrice
              </p>
            </div>
          </div>
        </section>
      </>
    </>
  );
}
