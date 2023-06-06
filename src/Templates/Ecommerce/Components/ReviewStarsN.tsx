import React, { useState } from 'react';
import '../../../assets/styles/templatesStyles/Ecommerce/ReviewStars.scss';

interface ReviewStarsProps {
  id: string;
  onRatingChange: (value: number) => void; // Callback function type
}

const ReviewStarsN: React.FC<ReviewStarsProps> = ({ id, onRatingChange }) => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const handleRatingChange = (value: number): void => {
    setSelectedRating(value);
    // Call the callback function passed from the parent
    onRatingChange(value);
    console.log(`Selected rating: ${value}`);
  };

  return (
    <div className="review-stars">
      {[5, 4, 3, 2, 1].map((value) => (
        <React.Fragment key={value}>
          <input
            type="radio"
            name={`rating-${id}`}
            id={`${id}-${value}`}
            value={value}
            checked={selectedRating === value}
            onChange={() => handleRatingChange(value)}
          />
          <label htmlFor={`${id}-${value}`}></label>
        </React.Fragment>
      ))}
    </div>
  );
};

export default ReviewStarsN;
