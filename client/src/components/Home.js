import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Image } from "semantic-ui-react";

function Home() {

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    }
  };

const images = [
"https://images.unsplash.com/photo-1556912173-3bb406ef7e77?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
"https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
"https://images.unsplash.com/photo-1556912167-f556f1f39fdf?q=80&w=2962&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
]

return (

  <div  style={{ paddingTop: "15px", margin: "auto", width: "50%", height: "50%" }}>
    <Carousel
      infinite={true}
      autoPlay={1}
      autoPlaySpeed={5000}
    //   customTransition="all .5" // Changes and not scrolls
      customTransition="transform 1000ms ease-in-out" // Scrolls
      transitionDuration={1000}
      arrows={false}
      responsive={responsive}
      dotListClass="custom-dot-list-style"
      containerClass="carousel-container"
      itemClass="carousel-item-padding-40-px"
      style={{ textAlign: "center", paddingTop: "5px", paddingBottom: "5px", backgroundColor: "#000000", color: "white" }}
      showDots={true}
    >
      {images.map((image, index) => {
        return (
          <Image
          key={index}
          draggable={false}
          style={{}}
          src={image}
        />
        );
      })}
    </Carousel>
  </div>
);

}

export default Home;
