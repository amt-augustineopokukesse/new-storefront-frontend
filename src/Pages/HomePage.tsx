import React from 'react';
//import { Link } from 'react-router-dom';
import SignOut from '../components/authComponents/SignOut';
import { textProps } from '../staticDB/authData';

const HomePage: React.FC = () => {
  return (
    <div>
      {textProps.home}
      <SignOut />
    </div>
  )
}

export default HomePage;