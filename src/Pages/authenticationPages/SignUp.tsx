import React from "react";
import SignUpForm from "../../components/authComponents/SignUpForm";
import AuthHero from "../../components/authComponents/AuthHero";
import '../../assets/styles/authenticationStyles/SignUp.scss';

const SignUp: React.FC = () => {

  return (
    <div className="signup">
      <AuthHero />
      <SignUpForm/>
    </div>
  );
};

export default SignUp;
