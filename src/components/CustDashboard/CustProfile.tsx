import { useEffect, useState } from 'react';
import '../../assets/styles//custDashboardStyles/CustProfile.scss';
import SignOut from '../Dashboard/SignOut';

type UserProfile = {
    first_name: string;
    profile_picture: string;
}

export const CustProfile: React.FC = () => {
    const userProfile: UserProfile = { first_name: "", profile_picture: "" };
    const [ customerExists, setCustomerExists ] = useState(userProfile)
    
    useEffect(() => {
        const customer = localStorage.getItem("customer");
        if (customer) {
            setCustomerExists(JSON.parse(customer));
        }
    }, [])
    

    const [showMenu, setShowMenu] = useState(false);

    const handleClick = () => {
        setShowMenu(!showMenu);
    }

    return (
        <div className='profile-photo-menu'>
            <img className="profile-photo" src={customerExists?.profile_picture} alt="" />
            <div className="profile-menu">
                <button className="profile-button" onClick={handleClick}>
                    { customerExists? customerExists.first_name : "Customer"}
                </button>
                {showMenu && (
                    <ul className="profile-list">
                        <SignOut />
                    </ul>
                )}
                
            </div>
        </div>
    )
}