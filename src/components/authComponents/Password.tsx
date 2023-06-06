import React from 'react'
import TextInput from './TextInput';
import '../../assets/styles/authenticationStyles/Email.scss';


interface passwordProp {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    pattern?: string;
    label: string;
    name: string;
    id: string;
    type: string;
    disabled?: boolean;
}


const Password: React.FC<passwordProp> = (props) => {
  return (
    
        <div className='password-form'>
          <TextInput type="password" id={props.id} name={props.name}  label={props.label} onChange={props.onChange} pattern={props.pattern} />  
          
        </div>
    
  )
}

export default Password;