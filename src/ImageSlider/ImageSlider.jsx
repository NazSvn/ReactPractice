import PropTypes from 'prop-types';
import { useEffect, useState, memo } from 'react';
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from 'react-icons/fa';
import './styles.css';

const ImageSlider = ({ url }) => {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchImages = async (url) => {
    try {
      setLoading(true);

      const response = await fetch(`${url}?page=2&limit=10`);
      const data = await response.json();

      if (data) {
        setImages(data);
      }
    } catch (error) {
      console.error('Error fetching data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (url !== '') fetchImages(url);
  }, [url]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handlePreviousImage = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  const handleNextImage = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }; 
  
  return (
    <>
      <div className='container'>
        <FaRegArrowAltCircleLeft
          size={40}
          className='arrow arrow-left'
          onClick={handlePreviousImage}
        />
        <FaRegArrowAltCircleRight
          size={40}
          className='arrow arrow-right'
          onClick={handleNextImage}
        />

        {images && images.length
          ? images.map((image, i) => (
              <img
                key={image.id}
                className={
                  currentSlide === i
                    ? 'current-image'
                    : 'current-image hide-current-image'
                }
                src={image.download_url}
                alt={image.download_url}
              />
            ))
          : null}

        <span className='indicator'>
          {images && images.length
            ? images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={
                    currentSlide === i
                      ? 'current-indicator'
                      : 'current-indicator inactive'
                  }
                ></button>
              ))
            : null}
        </span>
      </div>
    </>
  );
};

export default memo(ImageSlider);

ImageSlider.propTypes = {
  url: PropTypes.string.isRequired,
};
