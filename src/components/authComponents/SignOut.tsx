import React from 'react'
import { useAppDispatch } from '../../store';
import { resetAuthState } from '../../Redux/Authentication/AuthSlice';
import { textProps } from '../../staticDB/authData';

const SignOut:React.FC = () => {
  const dispatch = useAppDispatch();

  const signOut = () => {
    window.localStorage.removeItem("token");
    dispatch(resetAuthState());
    window.location.href = '/';
  }

  return (
    <div>
      <button onClick={signOut}>{textProps.logout}</button>
    </div>
  )
}

export default SignOut;
