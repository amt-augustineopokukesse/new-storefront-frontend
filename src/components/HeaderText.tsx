import '../assets/styles/HeaderText.scss';
import { Link } from 'react-router-dom';

export const HeaderText: React.FC = () => {
    return (
        <Link to='/'>
            <h2 className="header-text">Storefront</h2>
        </Link>
        
    )
}