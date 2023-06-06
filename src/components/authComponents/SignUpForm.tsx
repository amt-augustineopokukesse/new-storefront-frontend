import React, { useState, useEffect, useRef } from 'react';
import TextInput from './TextInput';
import '../../assets/styles/authenticationStyles/SignUpForm.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { addNewUser } from '../../Redux/Authentication/AuthSlice';
import { NewBusiness, NewUser } from '../../Redux/Authentication/authInitialStates';
import Email from './Email';
import Password from './Password';
import {
  validateEmail,
  handleEmailCheck,
  handlePasswordCheck,
  handleValidPassword,
  validatePassword,
  handleValidName,
  clearError
} from './AuthUtils';
import PasswordInfo from './PasswordInfo';
import { AuthLoader } from './AuthLoader';
import { initialNewBusinessFormState, initialNewUserFormState } from '../../Redux/Authentication/authInitialStates';
import { styleProps, textProps } from '../../staticDB/authData';
import { toast } from 'react-toastify';

const SignUpForm: React.FC = () => {
  const [businessAccount, setBusinessAccount] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [formState, setFormState] = useState<NewUser | NewBusiness>( initialNewUserFormState);

  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();

  const errorMessage = document.getElementById('error-div') as HTMLElement;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if(name === 'password') {
      handleValidPassword(value);
      setFormState(prevState => ({ ...prevState, [name]: value }));
      clearError(errorMessage);
    } else if(name === 'first_name' || name === 'last_name') {
      handleValidName(name, value);
      setFormState(prevState => ({ ...prevState, [name]: value }));
    } else if (name === 'email'){
        if (errorMessage) {
          clearError(errorMessage);
          const emailDiv = document.getElementById('email') as HTMLElement;
          emailDiv.style.border = styleProps.noBorder;
        }
        setFormState(prevState => ({ ...prevState, [name]: value }));
    } else {
      setFormState(prevState => ({ ...prevState, [name]: value }));
      clearError(errorMessage);
    }
  };

  useEffect(() => {
    handlePasswordCheck(formState);
  },[formState])

  const validEmail = validateEmail(formState.email);
  const validPassword = validatePassword(formState.password);
  const matchedPasswords = formState.password === formState.confirm_password;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formRef.current?.reset();
    if (!validEmail){
      handleEmailCheck(validEmail);
      errorMessage.style.display = styleProps.display;
      errorMessage.textContent = textProps.invalidEmail;
      setFormState(businessAccount ? initialNewBusinessFormState : initialNewUserFormState);
      return;
    } else if(!validPassword || !matchedPasswords){
      errorMessage.style.display = styleProps.display;
      errorMessage.textContent = textProps.invalidPassword;
      setFormState(businessAccount ? initialNewBusinessFormState : initialNewUserFormState);
      return;
    } else {
      try {
        setLoader(true);
        const userSignUpResponse = await dispatch(addNewUser(formState)).unwrap();
        setFormState(businessAccount ? initialNewBusinessFormState : initialNewUserFormState);

        if (userSignUpResponse && userSignUpResponse.success) {
          toast.success(userSignUpResponse.message);
          setLoader(false);
          navigate("/authnotification");
        } else if (userSignUpResponse && !userSignUpResponse.success) {
          toast.error(userSignUpResponse);
          errorMessage.style.display = styleProps.display;
          errorMessage.textContent = userSignUpResponse;
          setLoader(false);
        }
        return;
      } catch (err) {
          setLoader(false);
          setFormState(businessAccount ? initialNewBusinessFormState : initialNewUserFormState);
          toast.error('Oops!! Error logging. Try again or contact Storefront Administrator');
        return;
      }
    }
  };

  const formChanger = () => {
    setBusinessAccount(!businessAccount);
  };

  useEffect(() => {
    setFormState(businessAccount ? initialNewBusinessFormState : initialNewUserFormState);
  }, [businessAccount]);

  return (
    <div className='signup-container'>
      <h1 className='header-text'>{textProps.signup}</h1>
      <div id='error-div'></div>

      <form className='FormContainer' onSubmit={handleSubmit} ref={formRef}>
        {businessAccount ? (
          <div className='business-name'>
            <TextInput type="text" id="business" name="business_name" label='Business Name' onChange={handleInputChange} />
          </div>
        ) : (
          <div className="input-names">
            <div className='name-box'>
              <TextInput type="text" id="fname" name="first_name" label='First Name' onChange={handleInputChange} />
            </div>
            <div className='name-box'>
              <TextInput type="text" id="lname" name="last_name" label='Last Name' onChange={handleInputChange} />
            </div>
          </div>
        )}
        <Email onChange={handleInputChange} />
        <PasswordInfo />
        <div className="password">
          <Password type="password" id="pw1" name="password"  label='Password' onChange={handleInputChange} />
          <Password type="password" id="pw2" name="confirm_password"  label='Confirm Password' onChange={handleInputChange} disabled />
        </div>
        <button className='submit-button'>{textProps.createAccount}</button>
        {loader ? <AuthLoader /> : ''}
      </form>

      <p className="old-member"> {textProps.oldMember} <Link to='/login' className="login-text">{textProps.login}</Link> </p>
      <div className='business-signup'>{textProps.create} <span className='business-signup-link' onClick={formChanger} >{businessAccount ? textProps.individual : textProps.business} {textProps.account}</span></div>
    </div>
  )
}

export default SignUpForm;
