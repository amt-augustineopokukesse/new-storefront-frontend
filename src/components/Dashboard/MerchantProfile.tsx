import { useEffect, useState } from 'react';
import '../../assets/styles/dashboardStyles/MerchantProfile.scss';
import SignOut from './SignOut';

type User = {
    profile_picture: string;
    business_name: string;
}

export const MerchantProfile: React.FC = () => {
    const user: User = { profile_picture: "", business_name: "" };
    const [ merchantExists, setmerchantExists ] = useState(user)
    
    useEffect(() => {
        const merchant = localStorage.getItem("merchant");
        if (merchant) {
            setmerchantExists(JSON.parse(merchant));
        }
    }, [])
    

    const [showMenu, setShowMenu] = useState(false);

    const handleClick = () => {
        setShowMenu(!showMenu);
    }

    return (
        <div className='merchant-profile-photo-menu'>
            <img className="merchant-profile-photo" src={merchantExists?merchantExists.profile_picture : "MN"} alt="" />
            <div className="merchant-profile-menu">
                <button className="merchant-profile-button" onClick={handleClick}>
                    { merchantExists? merchantExists.business_name : "Merchant"}
                </button>
                {showMenu && (
                    <ul className="merchant-profile-list">
                        <SignOut />
                    </ul>
                )}
                
            </div>
        </div>
    )
}