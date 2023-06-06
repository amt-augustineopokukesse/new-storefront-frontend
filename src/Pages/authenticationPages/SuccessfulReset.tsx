import { AuthHeaderText } from '../../components/authComponents/AuthHeaderText';
import '../../assets/styles/authenticationStyles/SuccessfulReset.scss';
import { Link } from 'react-router-dom';
import { textProps } from '../../staticDB/authData';

const SuccessfulReset: React.FC = () => {

    return (
        <>
        <AuthHeaderText />
            <div className='password-reset-success'>
                <h3 className='success-header'>{textProps.notificationHeader}</h3>
                <p className='success-text' id='successText'>{textProps.successAuthText}</p>
                <div className='button'>
                    <Link to='/login'>
                        <button className='login-button'>{textProps.login}</button>
                    </Link>
                    
                </div>
            </div>
        </>
        
    )
}

export default SuccessfulReset;