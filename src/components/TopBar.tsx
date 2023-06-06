import { HeaderText } from "./HeaderText"
import '../assets/styles/TopBar.scss'
import { useState } from "react"
import burger from '../assets/svg/menu-hamburger.svg';
import { Link } from "react-router-dom";
import { useAppDispatch } from "../store";
import { resetAuthState } from "../Redux/Authentication/AuthSlice";

export const TopBar = () => {

    let loggedIn = window.localStorage.getItem('token');
    const dispatch = useAppDispatch();

    const signOut = () => {
        window.localStorage.clear();
        loggedIn = ""
        dispatch(resetAuthState());
        // navigate('/');
        window.location.href = '/';
    }

    const [showMenu, setShowMenu] = useState(false);

    const handleClick = () => {
        setShowMenu(!showMenu);
    }
    return (
        <div className="top-bar">
            <HeaderText />
            <span className="login-register-buttons">
                { !loggedIn && <Link to='/login'>
                    <button className="login-button">Log in</button>
                </Link>}
                { !loggedIn && <Link to='/signup'>
                    <button className="register-button">Register</button>
                </Link>}
                {loggedIn && <button onClick={signOut} className="register-button">Logout</button>}
            </span>
            <div className="harmburger-menu">
                <button className="menu-button" onClick={handleClick}>
                <img src={burger} alt="" />
                </button>
                {showMenu && (
                    <ul className="menu-list">
                        <li className="menu-item"><button className="login-button">Log in</button></li>
                        <li className="menu-item"><button className="register-button">Register</button></li>
                    </ul>
                )}
                
            </div>
        </div>
    )
}
