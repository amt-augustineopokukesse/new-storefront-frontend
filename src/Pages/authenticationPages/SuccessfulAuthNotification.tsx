import { AuthHeaderText } from '../../components/authComponents/AuthHeaderText';
import '../../assets/styles/authenticationStyles/SuccessfulNotification.scss';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { textProps } from '../../staticDB/authData';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
 
const SuccessfulAuthNotification: React.FC = () => {
    const { token } = useParams();
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const getVerified =async () => {
        try {
            const { data } = await axios.get(`${API_BASE_URL}/verify/${token}`);
            if (data) {
                setSuccess(data.success);
                setSuccessMessage(data.message);
            } else {
                setSuccess(false);
            }
        } catch (error) {
            setSuccess(false);
            setSuccessMessage(textProps.brokenLink)
        }
    }

    useEffect(() => {
        getVerified()
    });

    return (
        <>
        <AuthHeaderText />
        <div className="auth-login">
            <h3 className="auth-login-header">{textProps.notificationHeader}</h3>
            <p className="auth-login-text">{ successMessage }</p>
            {success && <Link to='/login'><button className="auth-login-button">{textProps.login}</button></Link>}

        </div>
        </>
    )
}
export default SuccessfulAuthNotification;
