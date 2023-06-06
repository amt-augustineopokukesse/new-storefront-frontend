import React, {useState, useEffect, useRef } from 'react';
import '../../assets/styles/authenticationStyles/ResetPw.scss';
import Password from '../../components/authComponents/Password';
import { NewPassword, initialPasswordState } from '../../Redux/Authentication/authInitialStates';
import { clearError, handlePasswordCheck, handleValidPassword, validatePassword } from '../../components/authComponents/AuthUtils';
import { useAppDispatch } from '../../store';
import { resetPassword } from '../../Redux/Authentication/AuthSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthLoader } from '../../components/authComponents/AuthLoader';
import { styleProps, textProps } from '../../staticDB/authData';
import { toast } from 'react-toastify';


const ResetPassword: React.FC = () => {
  const [formState, setFormState] = useState<NewPassword>(initialPasswordState);
  const [loader, setLoader] = useState<boolean>(false);
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  //const resetPasswordResponse: resp | null = useAppSelector((state) => state.auth.auth.newPassword);


  useEffect(() => {
    handlePasswordCheck(formState);
  },[formState, formState.confirm_password])

  const errorMessage = document.getElementById('pw-error') as HTMLElement;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if(name === 'password') {
      handleValidPassword(value);
      setFormState(prevState => ({ ...prevState, [name]: value }));
      formState.id = id;
      clearError(errorMessage);
    }  else {
      setFormState(prevState => ({ ...prevState, [name]: value }));
      clearError(errorMessage);
    }
  };

  const validPassword = validatePassword(formState.password);
  const matchedPasswords = formState.password === formState.confirm_password;

  const throwError = () => {
    errorMessage.style.display = styleProps.display;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(!validPassword || !matchedPasswords){
      throwError();
      formRef.current?.reset();
    } else {
      try {
        setLoader(true);
        const resetPasswordResponse = await dispatch(resetPassword(formState)).unwrap();
        formRef.current?.reset();
        setFormState(initialPasswordState);
        if (resetPasswordResponse && resetPasswordResponse.success && resetPasswordResponse.message){
          toast.success(resetPasswordResponse.message);
          navigate('/successful-reset');
          setLoader(false);
        }
      } catch (error) {
          setLoader(false);
          setFormState(initialPasswordState);
          errorMessage.style.display = styleProps.display;
          errorMessage.textContent = textProps.noConnection;
          return;
      }
    }
  };

  


  return (
    <div className='password-reset-container'>
        <div className='password-reset'>
        <h1 className='container-header'>{textProps.newPassword}</h1>
        <p className='request-text'>{textProps.newPasswordPrompt}</p>
        <div id='pw-error'>{textProps.invalidPassword}</div>

        <form className='passwordForm' onSubmit={handleSubmit} ref={formRef}>
          <div className="password">
            <Password type="password" id="new-pw1" name="password"  label='New Password' onChange={handleInputChange}/>
            <Password type="password" id="new-pw2" name="confirm_password"  label='Confirm Password' onChange={handleInputChange}/>
          </div>
          <button className='send-button'>{textProps.send}</button>
          {loader ? <AuthLoader /> : ''}
        </form>

      </div>
    </div>
  )}

export default ResetPassword;
