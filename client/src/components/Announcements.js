import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Image } from "semantic-ui-react";

function Announcement() {
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

  const announcements = [
    "FREE SHIPPING ON ALL ORDERS",
    "BLACK FRIDAY SALE COMING SOON",
    "NEW CUSTOMERS GET 20% OFF WITH CODE: 'FRIENDS20'"
  ]

return (
    <Carousel
    //   ssr
    //   partialVisbile
    //   keyBoardControl={true}
      infinite={true}
    //   Turn back on when finalizing
      autoPlay={true}
      autoPlaySpeed={6000}
    //   customTransition="all .5" // Changes and not scrolls
      customTransition="transform 2000ms ease-in-out" // Scrolls
      transitionDuration={1000}
      arrows={false}
      responsive={responsive}
      
      containerClass="carousel-container"
      itemClass="carousel-item-padding-40-px"
      
    >
      {announcements.slice(0, 5).map((announcement, index) => {
        return (
        <p key={index}>{announcement}</p>
        );
      })}
    </Carousel>
  );

}

export default Announcement;