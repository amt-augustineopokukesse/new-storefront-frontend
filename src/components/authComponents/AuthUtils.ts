import { NewUser, NewPassword } from "../../Redux/Authentication/authInitialStates";
import { styleProps } from "../../staticDB/authData";

export const validateName = (name: string): boolean => {
  const namePattern = /^[a-zA-Z '.-]+$/;
  return namePattern.test(name);
};

export const handleValidName = (formName:string, formValue:string) => {
  const validName = validateName(formValue);
  const nameId = (formName === 'first_name') ? 'fname' : 'lname';
  const nameElement = document.getElementById(nameId) as HTMLElement;

  if (!validName){
    nameElement.style.border = '1px solid #FF3131';
  } else {
    nameElement.style.border = '1px solid transparent';
  }
};

export const validateEmail = (email: string): boolean => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
};

export const handleEmailCheck = (validEmail:boolean) => {
  const emailMisMatch = document.querySelector('.email-mismatch') as HTMLElement;
  const textInput = document.getElementById('email') as HTMLElement;
  if(!validEmail){
    emailMisMatch.style.display = 'block';
    textInput.style.border = '1px solid #FF3131';
  } else {
    emailMisMatch.style.display = 'none';
    textInput.style.border = '1px solid transparent';
  }
};

export const validatePassword = (password: string): boolean => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*?])[A-Za-z\d@#$%^&*?]{8,}$/;
    return passwordPattern.test(password);
};

export const handleValidPassword = (password:string) => {
  const validPassword = validatePassword(password);
  const password1Id = (location.pathname === '/signup') ? 'pw1' : 'new-pw1';
  const pw1Element = document.getElementById(password1Id) as HTMLElement;

  const password2Id = (location.pathname === '/signup') ? 'pw2' : 'new-pw2';
  const pw2Element = document.getElementById(password2Id) as HTMLElement;

  if (!validPassword){
    pw1Element.style.border = '1px solid #FF3131';
    pw2Element.style.border = '1px solid transparent';
  } else {
    pw1Element.style.border = '1px solid transparent';
  }
}


export const handlePasswordCheck = (formState:NewUser | NewPassword) => {
  const pw1Id = (location.pathname === '/signup') ? 'pw1' : 'new-pw1';
  const pw1 = document.getElementById(pw1Id) as HTMLElement;

  const pw2Id = (location.pathname === '/signup') ? 'pw2' : 'new-pw2';
  const pw2 = document.getElementById(pw2Id) as HTMLElement;

  if (formState.password === formState.confirm_password ) {
    pw1.style.border = '1px solid #62EA5F';
    pw2.style.border = '1px solid #62EA5F';
  } else {
     pw1.style.border = '1px solid transparent';
     pw2.style.border = '1px solid transparent';
  }
}

export const clearError = (errorMessage: HTMLElement) => {
  if (errorMessage) {
    errorMessage.style.display = styleProps.noDisplay;
  }
};

/**Social media handlers */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const handleFacebook = () =>{
  window.open(`${API_BASE_URL}/auth/facebook`,'_self')
}

export const handleGoogle = () =>{
  window.open(`${API_BASE_URL}/auth/google`,'_self')
}

export interface GeneralUser {
  id: string;
  email: string;
  password: string;
  contact?: string;
  first_name?: string;
  last_name?: string;
  business_name?: string;
  activated?: boolean;
  role: string;
  tokens: string;
  profile_picture?: string;  
  address?: string;
}

export const initialGeneralUser: GeneralUser =  {
  id: '',
  email: '',
  password: '',
  role: '',
  tokens: '',  
}

