import React, { useEffect, useRef, useState } from "react";
import "./ValuesHome.css";
import { INFODATA } from "../../Data/data";

const ValuesHome = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  const renderValues = INFODATA.HOME_VALUES.map((value) => {
    const { title, description, styles } = value;
    return (
      <div className="col scroll-animation" key={title} style={ 
        {translate: styles.translate,
        transition: styles.transition
      }}>
        <div className="p-3 box">
          <h4 className="p-2">{title}</h4>
          <p className="p-2">{description}</p>
        </div>
      </div>
    );
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const scrollAnimationElement = document.querySelectorAll(".scroll-animation");
          for (let item of scrollAnimationElement) {
            if (entry.isIntersecting && !hasAnimated) {
              item.style.translate = "0"
              item.style.opacity = "1"
              setHasAnimated(true)
            }
          }
        })
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <div className="container-fluid section-four m-0 py-5">
      <div
        className="container section-four text-center py-5 h-100 w-100"
        ref={elementRef}
      >
        <h2 className="p-3">Nuestros valores</h2>
        <div className="row row-cols-1 row-cols-lg-2 pt-2">
          {renderValues}
        </div>
      </div>
    </div>
  );
};

export default ValuesHome;
