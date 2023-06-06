import React, {useState, useRef} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthHero from '../../components/authComponents/AuthHero';
import '../../assets/styles/authenticationStyles/Login.scss';
import { User, initialLoginFormState } from '../../Redux/Authentication/authInitialStates';
import { useAppDispatch } from '../../store';
import Email from '../../components/authComponents/Email';
import { validateEmail, handleEmailCheck, handleGoogle } from '../../components/authComponents/AuthUtils';
import Password from '../../components/authComponents/Password';
import { userLogin } from '../../Redux/Authentication/AuthSlice';
//import facebookButton from '../../assets/svg/fb.svg';
import googleButton from '../../assets/svg/google.svg';
import { AuthLoader } from '../../components/authComponents/AuthLoader';
import { styleProps, textProps } from '../../staticDB/authData';
import { toast } from 'react-toastify';


const Login: React.FC = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [formState, setFormState] = useState<User>(initialLoginFormState);

  const dispatch = useAppDispatch();
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const errorMessage = document.getElementById('login-error') as HTMLElement;
  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      if (name === 'email'){
          if (errorMessage) {
            errorMessage.style.display = styleProps.noDisplay;
            const emailDiv = document.getElementById('email') as HTMLElement;
            emailDiv.style.border = styleProps.noBorder;
          }
          setFormState(prevState => ({ ...prevState, [name]: value }));
      } else {
        setFormState(prevState => ({ ...prevState, [name]: value }));
      }
  };
  
  const validEmail = validateEmail(formState.email);

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formRef.current?.reset();
    if (!validEmail) {
      handleEmailCheck(validEmail);
      formRef.current?.reset();
      setFormState(initialLoginFormState);
      errorMessage.style.display = styleProps.display;
      errorMessage.textContent = textProps.invalidEmail;
    } else {
      try {
        setLoader(true);
        const userLoginResponse = await dispatch(userLogin(formState)).unwrap();
        setFormState(initialLoginFormState);
        if (userLoginResponse && userLoginResponse.success) {
          toast.success(userLoginResponse.message);
          window.localStorage.setItem('token', userLoginResponse.data.token)
          window.localStorage.setItem(userLoginResponse.data.role, JSON.stringify(userLoginResponse.data));
          setLoader(false);
          navigate(userLoginResponse.data.role === "customer" ? "/custdashboard" : userLoginResponse.data.role === "merchant" ? "/dashboard" : "/login");
          return;
        } else if (userLoginResponse && !userLoginResponse.success) {
          toast.error(userLoginResponse);
          errorMessage.style.display = styleProps.display;
          errorMessage.textContent = userLoginResponse;
          setLoader(false);
          return;
        } else if (userLoginResponse && !userLoginResponse.userActivated) {
          toast.warn(userLoginResponse.message);
          setLoader(false);
          const passwordElement = document.getElementById('pw1') as HTMLElement;
          errorMessage.textContent = userLoginResponse.message;
          passwordElement.style.border = styleProps.borderRed;
        }
        return;
      } catch (error) {
          setLoader(false);
          setFormState(initialLoginFormState);
          // errorMessage.style.display = styleProps.display;
          // errorMessage.textContent = textProps.noConnection;
          toast.error('Oops!! Error logging in. Try again or contact Storefront Administrator');
        return;
      }
    }
  };

  return (
    <div className='login-container'>
      <div className='login-form-container'>
        <h1 className='header-text'>Log In</h1>
        <div id='login-error'></div>

        <form className='login-form' onSubmit={handleSubmit} ref={formRef}>
          <Email onChange={handleInputChange} />
          <Password type="password" id="pw1" name="password"  label='Password' onChange={handleInputChange}/> 
          <div className='check'>
            <input className='check-box' type="checkbox" name="" id="check" />
            <label  className='check-label' htmlFor='check' > Remember me </label>
          </div>
          <div className='buttons'>
            <div className='button'>
              <Link to='/resetpw1'><button className='forgot-password'>Forgot Password</button></Link>
            </div>
            <div className='button'>
              <button className='login-button'>Log In</button>
            </div>
            {loader ? <AuthLoader /> : ''}
          </div>
        </form>

        <div className='alt-login'>
          <span className='or-text'>OR</span> 
        </div>
        
        <p className='sm-text'>{textProps.smText}</p>
        <div className='sm-buttons'>
            <img src={googleButton} alt="google icon" className='sm-icon' onClick={handleGoogle}/>
            {/* <img src={facebookButton} alt="facebook icon" className='sm-icon' onClick={handleFacebook}/> */}
        </div>

        <p className="not-member"> {textProps.notMember} <Link to='/signup' className="sign-up-link">{textProps.signup}</Link> </p>
      </div>  
      <AuthHero />     
    </div>
  )
}

export default Login;
