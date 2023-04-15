import Image from 'next/image';
import homeStyles from "../styles/Carousel.module.css";

const Carousel = ({ carouselData } : any) => {
  return (
    <div className={homeStyles.wrapperImagesCaroussel}>
          <Image
            className={homeStyles.imagesProductsBanner}
            src={`/${carouselData[0].image}`}
            alt="Bijou"
            width={375}
            height={375}
          />
    </div>
  )
}

export default Carousel