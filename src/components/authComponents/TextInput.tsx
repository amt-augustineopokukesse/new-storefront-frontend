import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import '../../assets/styles/authenticationStyles/TextInput.scss';

interface inputProps {
  label: string;
  name: string;
  id: string;
  type: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  pattern?: string;
  endAdornment?: React.ReactNode;
}

const TextInput: React.FC<inputProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const placeholderText = () => {
    if (props.label === 'Email') {
      return 'test1@gmail.com';
    } else if (
      props.label === 'Password' ||
      props.label === 'Confirm Password' ||
      props.label === 'New Password'
    ) {
      return '**************';
    } else {
      return `Write ${props.label} here`;
    }
  };

  return (
    <div className="textInput" id={props.id}>
      <label className="text-label" htmlFor={props.id}>
        {props.label}
      </label>
      <br />
      <input
        className="text-input"
        placeholder={placeholderText()}
        type={props.type === 'password' ? (showPassword ? 'text' : 'password') : props.type}
        id={props.id}
        name={props.name}
        onChange={props.onChange}
        pattern={props.pattern}
        required
      />
      {props.type === 'password' && (
        <span className="icon-container" onClick={togglePasswordVisibility}>
          {showPassword ? (
            <AiOutlineEye className="eye-icon" />
          ) : (
            <AiOutlineEyeInvisible className="eye-icon" />
          )}
        </span>
      )}
      {props.endAdornment}
    </div>
  );
};

export default TextInput;
