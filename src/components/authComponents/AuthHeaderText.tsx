import '../../assets/styles/authenticationStyles/AuthHeaderText.scss';
import { Link } from 'react-router-dom';

export const AuthHeaderText: React.FC = () => {

    return (
        <Link to='/'>
            <h2 className="Auth-header-text">Storefront</h2>
        </Link>
        
    )
}