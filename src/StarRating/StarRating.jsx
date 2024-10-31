import { FaStar } from 'react-icons/fa6';
import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';

const StarRating = ({ numOfStars = 10 }) => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);

  const handleClick = useCallback(
    (currentIndex) => setRating(currentIndex),
    []
  );

  const handleMouseEnter = useCallback(
    (currentIndex) => setHovered(currentIndex),
    []
  );

  const handleMouseLeave = useCallback(() => setHovered(rating), [rating]);

  return (
    <>
      <div
        className='wrapper'
        style={{ flexDirection: 'row' }}
      >
        {[...Array(numOfStars)].map((_, i) => {
          const starNumber = (i += 1);
          return (
            <FaStar
              key={starNumber}
              style={
                starNumber <= (hovered || rating)
                  ? { color: '#ffea2b' }
                  : { color: 'inherit' }
              }
              onClick={() => handleClick(starNumber)}
              onMouseEnter={() => handleMouseEnter(starNumber)}
              onMouseLeave={() => handleMouseLeave(starNumber)}
              size={40}
            />
          );
        })}
      </div>
    </>
  );
};

export default StarRating;

StarRating.propTypes = {
  numOfStars: PropTypes.number,
};
