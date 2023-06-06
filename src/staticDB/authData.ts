import heroImage1 from '../assets/images/heroImage1.png';
import heroImage2 from '../assets/images/heroImage2.png';
import heroImage3 from '../assets/images/heroImage3.png';

export const images = [heroImage1, heroImage2, heroImage3];

export const heroData = {
    title: 'Storefront',
    urls: ['../../assets/images/heroImage1.png', '../assets/images/heroImage2.png', '../assets/images/heroImage3.png'],
    messages: ['Your own online store with a few clicks','Easy to use templates', 'Well created UI Designs'],
}

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const styleProps = {
    borderRed: '1px solid #FF3131',
    noDisplay: 'none',
    noBorder: '1px solid transparent',
    display: 'block',

}

export const textProps = {
    invalidEmail: 'Invalid Email format. Kindly check.',
    noConnection: 'Oops!! Error setting up a connection. Try again or contact Storefront Administrator',
    smText: 'Log in with',
    notMember: 'Not a member?',
    signup: 'Sign up',
    invalidPassword: 'Password mismatch or invalid password. Kindly re-enter',
    catchText: 'Error creating new user',
    createAccount: 'Create Account',
    oldMember: 'Already A Member?',
    login: 'Log In',
    create: 'Create',
    individual: 'Individual',
    business: 'Business',
    account: 'Account',
    notificationHeader: 'Authentication',
    emailPrompt: 'You should recieve an email shortly.',
    resetHeader: 'Password Reset',
    requestText: 'Kindly enter your email',
    send: 'Send',
    newPassword: 'New Password',
    newPasswordPrompt: 'Enter new password',
    brokenLink: "Broken Link. Contact the Storefront Administrator",
    successAuthText: "Authentication Successful",
    logout: "Log out",
    home: "Homepage",
}
