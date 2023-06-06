import React, {useState, useRef} from 'react';
import '../../assets/styles/authenticationStyles/ResetPw.scss';
import Email from '../../components/authComponents/Email';
import { validateEmail, handleEmailCheck } from '../../components/authComponents/AuthUtils';
import { useNavigate } from 'react-router-dom';
import { ResetPwEmail, initialEmailFormState } from '../../Redux/Authentication/authInitialStates';
import { useAppDispatch } from '../../store';
import { sendEmail } from '../../Redux/Authentication/AuthSlice';
import { AuthLoader } from '../../components/authComponents/AuthLoader';
import { styleProps, textProps } from '../../staticDB/authData';

const SendEmail: React.FC = () => {
  const [loader, setLoader] = useState<boolean>(false);
  
  const [formState, setFormState] = useState<ResetPwEmail>(initialEmailFormState);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  
  const errorMessage = document.getElementById('email-error') as HTMLElement;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (errorMessage) {
      errorMessage.style.display = styleProps.noDisplay;
      const emailElement = document.getElementById('email') as HTMLElement;
      emailElement.style.border = styleProps.noBorder;
    }
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };
  
  const validEmail = validateEmail(formState.email)  

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validEmail){
      handleEmailCheck(validEmail);
      errorMessage.style.display = styleProps.display;
      errorMessage.textContent = textProps.invalidEmail
     } else {
      try {
        setLoader(true);
        const userEmailResponse = await dispatch(sendEmail(formState)).unwrap();
        if (userEmailResponse && userEmailResponse.success) {
          setLoader(false);
          setFormState(initialEmailFormState);
          formRef.current?.reset();
          navigate('/authnotification')
        } else if (userEmailResponse && !userEmailResponse.success) {
          setLoader(false);
          errorMessage.style.display = styleProps.display;
          errorMessage.textContent = userEmailResponse;
        }
      } catch (error) {
        setLoader(false);
        setFormState(initialEmailFormState);
        errorMessage.style.display = styleProps.display;
        errorMessage.textContent = textProps.noConnection;
        return;
      }
     }
  };

  return (
    <div className='password-reset-container'>
      <div className='password-reset'>
        <h1 className='container-header'>{textProps.resetHeader}</h1>
        <p className='request-text'>{textProps.requestText}</p>
        <div id='email-error'></div>
        <form className='emailForm' onSubmit={handleSubmit} ref={formRef}>
            <div className='email-div'>
              <Email onChange={handleInputChange} />
            </div>
            <button className='send-button'>{textProps.send}</button>
            {loader ? <AuthLoader /> : ''}
        </form>
      </div>
    </div>
  )
}

export default SendEmail;