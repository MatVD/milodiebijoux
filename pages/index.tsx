import Head from "next/head";
import client from "../client/client";
import Image from "next/image";
import homeStyles from "../styles/Home.module.css";
import Button from "../components/Button";
import Link from "next/link";
import Carousel from "../components/Carousel";
import { useRouter } from "next/router";
import Header from "../components/Header";

export async function getStaticProps() {
  const categoriesRes = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/categories`)
  const categories = await categoriesRes.json();

  const carouselDataRes = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/products`)
  const carouselData = await carouselDataRes.json();

  return {
    props: {
      categories,
      carouselData
    },
  };
}

export default function Home({ categories, carouselData }: any) {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>Milodie Bijoux - Page d&apos;accueil</title>
        <meta
          name="description"
          content="Milodie Bijoux - creation de bijoux"
        />
      </Head>

      <div>
        <div className={homeStyles.wrapperImageAndCTA}>
          <div className={homeStyles.wrapperCTA}>
            <h1 className={homeStyles.h1}>
              Boucles d&apos;oreilles - Colliers - Bagues
            </h1>
            <h2 className={homeStyles.h2}>Parce que vous le valez bien !</h2>
          </div>
        </div>
        
        <Header />

        <Carousel carouselData={carouselData}/>

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
          <Button label={"Acheter"} onClick={() => router.push('products/boucles')} />
        </section>

        <section>
          <h2 style={{ textAlign: "center" }}>Avis</h2>
          <div className={homeStyles.sectionAvis}>
            <div className={homeStyles.avis1}>
              <div className={homeStyles.initialCircle}>MV</div>
              <p className={homeStyles.initialText}>
                Ces bijoux sont magnifique ! Un coups de coeur pour les oeuves
                de cette créatrice
              </p>
            </div>
            <div className={homeStyles.avis2}>
              <div className={homeStyles.initialCircle}>MV</div>
              <p className={homeStyles.initialText}>
                Ces bijoux sont magnifique ! Un coups de coeur pour les oeuves
                de cette créatrice
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
