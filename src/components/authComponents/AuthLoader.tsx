import '../../assets/styles/authenticationStyles/AuthLoader.scss';
import { useLocation } from 'react-router-dom';

const signuploader = {
    top:'40vh',
    left: '68vw',
    width: '40px',
    height: '40px'
}

const loginloader = {
    top:'35vh',
    left: '25vw',
    width: '40px',
    height: '40px'
}

const emailLoader = {
    top:'40vh',
    left: '17.5vw',
    width: '40px',
    height: '40px'
}

const passwordLoader = {
    top:'10vh',
    left: '17.5vw',
    width: '40px',
    height: '40px'
}

const resetPwId = location.pathname.match(/^\/resetpw2\/([a-zA-Z0-9$-_.+!*'(),]+)$/)

export const AuthLoader: React.FC = () => {
    const location = useLocation();
    return (
        <div className="lds-spinner" style={location.pathname === '/signup' ? signuploader : 
        location.pathname === '/login' ? loginloader: location.pathname === '/resetpw1' ? emailLoader : resetPwId !== null ? passwordLoader : {}}>
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    )
}
