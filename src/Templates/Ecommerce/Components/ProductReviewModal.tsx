import { useState } from "react"
import Modal from 'react-modal'
import ReviewStars from "./ReviewStars";
import { ProductReview } from "../../../Redux/Templates/ProjectInitialState";
import { ProductReviewForm } from "./ProductReviewForm";

interface modalProp{
    openModal: boolean,
    setOpenModal: (value: boolean) => void;
}

export const ProductReviewModal: React.FC<modalProp> = ({ openModal, setOpenModal }) => {
    const [openForm, setOpenForm] = useState(false);

    const handleFormModal = () => {
        setOpenForm(true);
    }

    const handleClose = () => {
        setOpenModal(!openModal);
    }

    const project = JSON.parse(localStorage.getItem('project') || '');
    const product_reviews = project.product_reviews;

    const formatRelativeTime = (timestamp: string): string => {
        const date = new Date(timestamp);
        const currentDate = new Date();
      
        const timeDiffInMilliseconds = currentDate.getTime() - date.getTime();
      
        if (timeDiffInMilliseconds < 0) {
          return 'Invalid timestamp';
        }
      
        const timeUnits: { unit: string; milliseconds: number }[] = [
          { unit: 'year', milliseconds: 1000 * 60 * 60 * 24 * 365 },
          { unit: 'month', milliseconds: 1000 * 60 * 60 * 24 * 30 },
          { unit: 'day', milliseconds: 1000 * 60 * 60 * 24 },
          { unit: 'hour', milliseconds: 1000 * 60 * 60 },
          { unit: 'minute', milliseconds: 1000 * 60 },
          { unit: 'second', milliseconds: 1000 },
        ];
      
        for (let i = 0; i < timeUnits.length; i++) {
          const { unit, milliseconds } = timeUnits[i];
          if (timeDiffInMilliseconds >= milliseconds) {
            const timeDiff = Math.floor(timeDiffInMilliseconds / milliseconds);
            return timeDiff + ' ' + (timeDiff === 1 ? unit : unit + 's') + ' ago';
          }
        }
      
        return 'Just now';
    };

    return (
        <>
        <Modal 
        isOpen={openModal} 
        style={{
            content: {
                width: '40vw',
                height: '75vh',
                display: 'flex',
                position: 'relative',
                top: '10vh',
                borderRadius: '10px',
                overflow: 'hidden',
                contain: 'content',
                WebkitOverflowScrolling: 'touch',
                justifyContent: 'center',
                margin: ' 5vh auto 5vh auto',
            },
            overlay: {
                background: 'rgba(0, 0, 0, 0.25)',
                backdropFilter: 'blur(2.5px)',
                padding: '0',
            }
        }}>
            <button className='close-modal' onClick={handleClose}>&#x2715;</button>
            <button className='write-review-button' onClick={handleFormModal}>Write a review</button>
            <div className='reviews'>
                {
                    product_reviews && product_reviews.map((review:ProductReview)  => (
                        <div className='review-component' key={review.createdAt}>
                        <span className="profile">
                            <img src={review.picture} alt="" className='profile-photo'/>
                            <span className='profileName-date'>
                                <h5 className='profile-name'>{review.name}</h5>
                                <span className="review-date">
                                    {formatRelativeTime(review.createdAt ?? '')}
                                </span>
                            </span>
                        </span>
                    <ReviewStars rating={review.rating ?? 0} id={`star-${review.createdAt}`} />
                    <div className='review-text'>
                        {review.comment}
                    </div>
                    </div>
                    ))
                }
            </div>
        </Modal>
        { openForm && (
            <ProductReviewForm openFormModal={openForm} setOpenFormModal={setOpenForm}/>
        ) }
        </>
    )
}