import * as React from 'react';
import './SlideshowImages.scss';
import 'react-slideshow-image/dist/styles.css';
import { Fade } from 'react-slideshow-image';
const image1 = require('../../assets/images/background_1.jpg');
const image2 = require('../../assets/images/background_2.jpg');
const image3 = require('../../assets/images/background_3.jpg');
const image4 = require('../../assets/images/background_4.jpg');
const image5 = require('../../assets/images/background_5.jpg');

const slideImages = [image1, image2, image3, image4, image5];
const divStyle = {
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  height: '100vh',
};
function SlideshowImages() {
  return (
    <div id="slideshow-images-wrapper">
      <Fade>
        {slideImages.map((slideImage, index) => (
          <div key={index}>
            <div style={{ ...divStyle, backgroundImage: `url(${slideImage})` }}></div>
          </div>
        ))}
      </Fade>
    </div>
  );
}

export default SlideshowImages;
