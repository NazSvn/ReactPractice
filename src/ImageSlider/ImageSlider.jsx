import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from 'react-icons/fa';
import './styles.css';

const ImageSlider = ({ url, limit, page }) => {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchImages = async (url) => {
    try {
      setLoading(true);

      const response = await fetch(`${url}?page=${page}&limit=${limit}`);
      const data = await response.json();

      if (data) {
        setImages(data);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching data', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (url !== '') fetchImages(url);
  }, [url]);

  console.log(images);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handlePreviousImage = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  const handleNextImage = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  console.log(currentSlide);

  return (
    <>
      <div className='container'>
        <FaRegArrowAltCircleLeft
          size={40}
          className='arrow arrow-left'
          onClick={handlePreviousImage}
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
        <FaRegArrowAltCircleRight
          size={40}
          className='arrow arrow-right'
          onClick={handleNextImage}
        />

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

export default ImageSlider;

ImageSlider.propTypes = {
  url: PropTypes.string.isRequired,
  limit: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
};
