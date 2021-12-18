import React from "react";
import Carousel from "react-bootstrap/Carousel";

import "bootstrap/dist/css/bootstrap.min.css";
import classes from './Carousel.module.css'
const BootstrapCarousel = () => {
  return (
    <div>
      <Carousel fade>
        <Carousel.Item interval={1000}>
          <img
            className="d-block w-100"
            src="https://pbs.twimg.com/profile_banners/2787069396/1410132946/1500x500"
            alt="First slide"
            height="350px"
          />
          <Carousel.Caption>
            <h1
            className={classes.p}
            >You can make the planet a better place</h1>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://sun9-3.userapi.com/c840130/v840130333/680c9/nYA550e2YQM.jpg"
            alt="Third slide"
            height="350px"
          />
          <Carousel.Caption>
            <h1
            className={classes.p}
            >You can make the planet a better place</h1>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.sisecam.com.tr/sites/catalogs/PublishingImages/sub-banners/surdurulebilirlik-yaklasimimiz_2.jpg"
            alt="Third slide"
            height="350px"
          />
          <Carousel.Caption>
            <h1
            className={classes.p}
            >You can make the planet a better place</h1>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};
export default BootstrapCarousel;
