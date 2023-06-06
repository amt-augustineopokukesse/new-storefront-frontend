import '../../assets/styles/dashboardStyles/TemplatesPage.scss'
import { useState } from 'react';
import ecommercelogo from '../../assets/images/house.png';
import dollarlogo from '../../assets/images/dollar.png'
import bloglogo from '../../assets/images/blog.png'
import { TemplatesPreview } from '../../components/Templates/TemplatePreview';

export const TemplatesPage: React.FC = () => {

    const [showMenu, setShowMenu] = useState(false);
    const [category, setCategory] = useState('');
    const [buttonText, setButtonText] = useState('Category');

    const handleClick = () => {
        setShowMenu(!showMenu);
    }
    const handleCategoryView = (event: React.MouseEvent<HTMLButtonElement>) => {
        const buttonText = event.currentTarget.innerText;
        setCategory(buttonText);
        setShowMenu(!showMenu);
        setButtonText(buttonText);
    }

    return (
        <div className='template-page'>
            <button className='category-button'  onClick={handleClick}>
                {buttonText}
            </button>
            {showMenu && (
                    <ul className="category-list">
                        <li className="category-item">
                            <button className="category-list-buttons" onClick={handleCategoryView}>
                                <span className='logo-name-span'>
                                    <img src={ecommercelogo} alt="" className='category-logos'/>
                                    <span>Ecommerce</span> 
                                </span>
                                
                            </button>
                        </li>
                        <li className="category-item">
                            <button className="category-list-buttons" onClick={handleCategoryView}>
                                <span className='logo-name-span'>
                                    <img src={dollarlogo} alt="" className='category-logos'/>
                                    <span>Finance</span> 
                                </span>
                               
                            </button>
                        </li>
                        <li className="category-item">
                            <button className="category-list-buttons" onClick={handleCategoryView}>
                                <span className='logo-name-span'>
                                     <img src={bloglogo} alt="" className='category-logos'/>
                                    <span>Blog</span>    
                                </span>
                                
                            </button>
                        </li>
                    </ul>
                )}

            <div className="template">
                <h3 className='template-header'>Templates</h3>
                <TemplatesPreview  category={category}/>
            </div>
        </div>
    )
}