import React, { useState } from "react";
import Modal from 'react-modal'
import ReviewStarsN from "./ReviewStarsN";
import { useAppDispatch } from "../../../store";
import { setProductReviews } from "../../../Redux/Templates/ProjectSlice";
import { useEffect } from "react";
import api from "../../../Redux/axiosClient";

interface modalProp{
    openFormModal: boolean,
    setOpenFormModal: (value: boolean) => void,
}
interface CustomerDataType {
    token: string;
    id: string;
    email: string;
    password: string;
    contact: string | null;
    first_name: string;
    last_name: string;
    address: string | null;
    business_name: string | null;
    activated: boolean;
    role: string;
    profile_picture: string;
    business: string | null;
    orders: {
      id: string;
      project_id: string;
      products: string;
      userId: string;
      amount: number;
      paid: boolean;
      shipping_reciepient_names: string[];
      shipping_reciepient_contacts: string[];
      shipping_reciepient_address: string;
      pickup_mode: string;
      payment_method: string;
      associated_account_number: string;
      delivery_level_reached: string;
      delivery_completed: boolean;
      created_at: string;
      updated_at: string;
    }[];
  }
  

export const ProductReviewForm: React.FC<modalProp> = ({ openFormModal, setOpenFormModal }) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        //keeps parent and child data updated
    }, []);

    const [receivedData, setReceivedData] = useState<number|null>();
    const [review, setReview] = useState('');

    const customer: string | null = localStorage.getItem('customer');
    const customerData: CustomerDataType | null = customer ? JSON.parse(customer) : null;

    const handleClose = () => { 
        setOpenFormModal(false);
    }
    const handleRatingChange = (value: number): void => {
        setReceivedData(value)
    };
    const handleReview = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReview(event.currentTarget.value);
    }

    const project = JSON.parse(localStorage.getItem('project') || '');
    const projectId = project?.id;
    const productId = project?.products[0].id;

    console.log(productId)

    const handlePost = async () => {
        const sendReview = await api.post(`/api/customer/product-review`, {
            project_id:projectId,
            rating: receivedData,
            comment: review,
            product_id: productId
        })
        const response = await sendReview?.data.data;
        dispatch(setProductReviews(response));

        const projectString = localStorage.getItem('project');
        const project = projectString ? JSON.parse(projectString) : {};
        if (project.product_reviews) {
            project.product_reviews.push(response);
          } else {
            project.product_reviews = [response];
          }
        localStorage.setItem('project', JSON.stringify(project));
        setOpenFormModal(!openFormModal);
    }

    return(
        <Modal isOpen={openFormModal} style={{
            content: {
                width: '25vw',
                height: '40vh',
                display: 'flex',
                position: 'relative',
                paddingTop: '0',
                borderRadius: '10px',
                top: '25vh',
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
            <button className='close-form-modal' onClick={handleClose}>&#x2715;</button>
            <div className="review-form">
                <h4>Write a review</h4>
                <span className="user-name">
                    <p>{`${customerData?.first_name} ${customerData?.last_name}`}</p>
                </span>
                <span className="review-star">
                    <ReviewStarsN id="hello" onRatingChange={handleRatingChange}/>
                </span>
                <textarea name="" id="" 
                className="review-input"
                onChange={handleReview}>
                </textarea>
                <button type="button" className="post-review-button" onClick={handlePost}>Post</button>
            </div>
        </Modal>
    )
}
