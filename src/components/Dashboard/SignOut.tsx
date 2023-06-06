import React from 'react'
//import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { resetAuthState } from '../../Redux/Authentication/AuthSlice';
import '../../assets/styles/dashboardStyles/SignOut.scss';

const SignOut:React.FC = () => {
  //const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const signOut = () => {
    window.localStorage.clear();
    dispatch(resetAuthState());
    // navigate('/');
    window.location.href = '/';
  }

  return (
      <button onClick={signOut} className='logout-button'>Log out</button>
  )
}

export default SignOut;
