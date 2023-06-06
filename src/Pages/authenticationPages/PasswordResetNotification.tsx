import { AuthHeaderText } from '../../components/authComponents/AuthHeaderText'
import '../assests/styles/authenticationStyles/PasswordResetNotification.scss'

export const PasswordResetNotification: React.FC = () => {
    return (
        <>
        <AuthHeaderText />
            <div className='password-reset'>
                <h3 className='password-reset-header'>Password reset</h3>
                <p className='password-reset-text'>Kindly check your email.</p>
            </div>
        </>
        
    )
}