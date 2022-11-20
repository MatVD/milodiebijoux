import Head from "next/head";
import client from "../client/client";
import styles from "../styles/Products.module.css";
import Image from "next/image";
import homeStyles from "../styles/Home.module.css";
import Logo from "../public/Logo.png";
import Button from "../components/Button";

// getStaticProps => fetch data from sanity
export async function getStaticProps() {
  const categories = await client.fetch(`*[_type == "category"]{
    title,
    description,
    price,
    "id": _id,
    "image": image.asset->url,
    currency
  }`);

  return {
    props: {
      categories,
    },
  };
}

export default function Home({ categories }: any) {
  return (
    <>
      <Head>
        <title>Milodie Bijoux - Page d'accueil</title>
        <meta
          name="description"
          content="Milodie Bijoux - creation de bijoux"
        />
      </Head>
      <>
        <section className={homeStyles.bandeau}>
          <Image
            className={homeStyles.imagesProducts}
            src={categories[4].image}
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
              Boucles d'oreilles - Colliers - Bagues
            </h1>
            <p>Parce que vous le valez bien !</p>
            <Button />
          </div>
        </div>
        <hr className={homeStyles.hr} />

        <section className={homeStyles.sectionProducts}>
          {categories.map((category: any) => (
            <div key={category.id} className={styles.wrapperProducts}>
              <h2>{category.title}</h2>
              <Image
                className={homeStyles.imagesProducts}
                src={category.image}
                alt="zefhvzloi"
                width={350}
                height={280}
              />
            </div>
          ))}
        </section>

        <section className={homeStyles.sectionLivraison}>
          <h2>Livraison</h2>
          <p>Offerte pour une commande de plus de 10000€</p>
          <Button />
        </section>

        <section>
          <h2 style={{textAlign: 'center'}}>Avis</h2>
          <div className={homeStyles.sectionAvis}>
            <div className={homeStyles.avis1}>
              <div className={homeStyles.initialCircle}>MV</div>
              <p className={homeStyles.initialText}>Ces bijoux sont magnifique ! Un coups de coeur pour cette créatrice</p>
            </div>
            <div className={homeStyles.avis2}>
              <div className={homeStyles.initialCircle}>MV</div>
              <p className={homeStyles.initialText}>Ces bijoux sont magnifique ! Un coups de coeur pour cette créatrice</p>
            </div>
          </div>
        </section>
      </>
    </>
  );
}
