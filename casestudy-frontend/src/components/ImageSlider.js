import React, { useState, useEffect } from 'react';
import './styles/ImageSlider.css';  // Assuming ImageSlider.css is in the same folder as ImageSlider.js
import img1 from '../assets/images/image1.jpg'; // Correct path to the images folder
import img2 from '../assets/images/image2.jpg';
import img3 from '../assets/images/image3.jpg';
import img4 from '../assets/images/image4.jpg';
import img5 from '../assets/images/image5.jpg';
import img6 from '../assets/images/image6.jpg';

const ImageSlider = () => {
  const images = [img1, img2 , img3, img4,img5,img6]; // Array of images
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Slide every 3 seconds

    return () => clearInterval(slideInterval); // Clean up interval on component unmount
  }, [images.length]);

  // Function to handle dot navigation
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="slider-container">
      <div
        className="slider-wrapper"
        style={{ transform: `translateX(-${currentIndex * 100}vw)` }}
      >
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Slide ${index}`} className="slider-image" />
        ))}
      </div>

      {/* Dot Navigation */}
      <div className="slider-dots">
        {images.map((_, index) => (
          <div
            key={index}
            className={`slider-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)} // Navigate to the slide on dot click
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
