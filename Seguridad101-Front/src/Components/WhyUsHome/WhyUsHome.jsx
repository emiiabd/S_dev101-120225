import React, { useEffect, useRef, useState } from "react";
import "./WhyUsHome.css";
import { ParallaxBanner, Parallax } from "react-scroll-parallax";
import { INFODATA } from "../../Data/data";

const WhyUsHome = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRefWhyUs = useRef(null);

  const renderListItems = INFODATA.HOME_WHY_US.map((value) => {
    const { title, description, styles } = value;

    return (
      <div
        className="my-2 list-item scroll-animation-why-us"
        style={{
          translate: styles.translate,
          transition: styles.transition
        }}
        key={title}
      >
        <div className="d-flex gap-1">
          <i className="bi bi-chevron-double-right"></i>
          <h5>{title}</h5>
        </div>
        <p>
          {description}
        </p>
      </div>
    );
  });

  useEffect(() => {


    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => {
          const scrollAnimationElement = document.querySelectorAll(".scroll-animation-why-us");
          for (let item of scrollAnimationElement) {
            if (entry.isIntersecting && !hasAnimated) {
              item.style.translate = "0"
              item.style.opacity = "1"
              setHasAnimated(true)
            }
          }
        })
      },
      { threshold: 0.7 }
    );

    if (elementRefWhyUs.current) {
      observer.observe(elementRefWhyUs.current);
    }

    return () => {
      if (elementRefWhyUs.current) {
        observer.unobserve(elementRefWhyUs.current);
      }
    };
  }, [hasAnimated]);

  return (
    <div ref={elementRefWhyUs}>
    <ParallaxBanner layers={[{ image: "./intro_slide_3-30.jpg", speed: 30 }]} className="container-fluid section section-three m-0 py-5 ">
        <div className="container section-threes py-5 h-100 w-100" >
          <div className="row d-flex align-items-center">
            <div 
              className="col-lg-6 d-flex align-items-center justify-content-center text-center scroll-animation-why-us why-us-title"
            >
              <h2>¿Por qué elegirnos?</h2>
            </div>
            <div className="col-lg-6 d-flex align-items-center">
              <ul className="list m-0">
                {renderListItems}
              </ul>
            </div>
          </div>
        </div>
    </ParallaxBanner>
  </div>
  );
};

export default WhyUsHome;
