import React from 'react';
import '../../../assets/styles/templatesStyles/Ecommerce/ReviewStars.scss';

interface ReviewStarsProps {
  rating: number;
  id: string;
}

const ReviewStars: React.FC<ReviewStarsProps> = ({ rating, id }) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    for (let i = 1; i <= 5; i++) {
      const starId = `${id}-${i}`;
      const value = i;

      if (i <= fullStars) {
        stars.push(
          <React.Fragment key={starId}>
            <input
              type="radio"
              name={`rating-${id}`}
              id={starId}
              value={value}
              checked={rating >= value && rating < value + 1}
              readOnly
            />
            <label htmlFor={starId}></label>
          </React.Fragment>
        );
      } else if (i === Math.ceil(rating) && hasHalfStar) {
        stars.push(
          <React.Fragment key={starId}>
            <input
              type="radio"
              name={`rating-${id}`}
              id={starId}
              value={value}
              checked
              readOnly
            />
            <label htmlFor={starId}></label>
          </React.Fragment>
        );
      } else {
        stars.push(
          <React.Fragment key={starId}>
            <input
              type="radio"
              name={`rating-${id}`}
              id={starId}
              value={value}
              readOnly
            />
            <label htmlFor={starId}></label>
          </React.Fragment>
        );
      }
    }

    return stars;
  };

  return <div className="review-stars">{renderStars()}</div>;
};

export default ReviewStars;
