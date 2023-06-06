import React from 'react'
import TextInput from './TextInput';
import '../../assets/styles/authenticationStyles/Email.scss';


interface emailProp {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    pattern?: string;
}


const Email: React.FC<emailProp> = (props) => {
  return (
    
        <div className="email" id="text-input">
          <TextInput type="email" id="email" name="email"  label='Email' onChange={props.onChange} pattern={props.pattern}/>  
          <div className='email-mismatch'>Enter valid email</div>
        </div>
    
  )
}

export default Email;