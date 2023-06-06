import Modal from 'react-modal'
import '../../../assets/styles/templatesStyles/Ecommerce/ReviewModal.scss'
import ReviewStars from './ReviewStars'
import { useAppSelector } from '../../../store'
import { ReviewForm } from './ReviewForm'
import { useState } from 'react'
import { Review } from '../../../Redux/Templates/ProjectInitialState'


interface modalProp{
    openModal: boolean,
    setOpenModal: (value: boolean) => void
}
export const ReviewModal: React.FC<modalProp> = ({ openModal, setOpenModal }) => {
    ///review form state
    const [openForm, setOpenForm] = useState(false);
    const handleFormModal = () => {
        setOpenForm(true);
    }
    

    const project = useAppSelector(state => state.project);
    const reviews = project?.reviews;

    const handClose = () => {
        setOpenModal(false);
    }
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
                width: '50vw',
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
            <button className='close-modal' onClick={handClose}>&#x2715;</button>
            <button className='write-review-button' onClick={handleFormModal}>Write a review</button>
            <div className='reviews'>
                {
                    reviews && reviews.map((review:Review)  => (
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
            <ReviewForm openFormModal={openForm} setOpenFormModal={setOpenForm}/>
        ) }
        </>
    )
}