import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

const images = ["/book.png", "/book2.png"];

export default function Hero({ deviceType = "desktop" }) {
  return (
    <Carousel
      swipeable={true}
      draggable={true}
      showDots={true}
      responsive={responsive}
      ssr={true}
      infinite={true}
      autoPlay={deviceType !== "mobile"}
      autoPlaySpeed={3000}
      keyBoardControl={true}
      customTransition="all .5s"
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      deviceType={deviceType}
      dotListClass="custom-dot-list-style"
      itemClass="flex justify-center"
    >
      {images.map((src, index) => (
        <div
          key={index}
          className="relative w-full flex justify-center overflow-hidden bg-gray-100"
        >
          <img
            src={src}
            alt={`book ${index + 1}`}
            className=" object-cover rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      ))}
    </Carousel>
  );    
}
