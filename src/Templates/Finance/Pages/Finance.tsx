import '../../../assets/styles/templatesStyles/Finance/Finance.scss'
import searchlogo from '../../../assets/images/Vector (5).png'
import puzzleImg from '../../../assets/images/puzzle.png'
import React, { useState } from 'react'
import { MessageForm } from '../Components/MessageForm'
import { Footer } from '../Components/Footer'
import familyImg from '../../../assets/images/boy-with-his-father.png'
import teamImg from '../../../assets/images/team-high-five.png'
import houseImg from '../../../assets/images/houseImg.png'
import pepperImg from '../../../assets/images/pepper.png'
import houselogo from '../../../assets/images/house Vector.png'
import arrowImg from '../../../assets/images/finance Vector.png'
import handshakelogo from '../../../assets/svg/handshake-logo.svg'
import { useAppSelector } from '../../../store'


export const Finance: React.FC = () => {
const FinanceData = useAppSelector(state => state.finance);

    const [currentButton, setCurrentButton] = useState(FinanceData.toggleButtons.firstButtonText.content);
    const handleActive = (event: React.MouseEvent<HTMLButtonElement>) => {
        setCurrentButton(event.currentTarget.id);
    }
    const toggleDivData = currentButton === FinanceData.toggleButtons.firstButtonText.content
    ? FinanceData.toggleDiv.components.personal
    : FinanceData.toggleDiv.components.business;

    const section3_Data = currentButton === FinanceData.toggleButtons.firstButtonText.content 
    ? FinanceData.section3.components.personal 
    : FinanceData.section3.components.business;

    const section4_Data = currentButton == FinanceData.toggleButtons.firstButtonText.content 
    ? FinanceData.section4.components.personal 
    : FinanceData.section4.components.business;

    const section3_img = currentButton == FinanceData.toggleButtons.firstButtonText.content
    ? familyImg : teamImg

    const section4_img = currentButton == FinanceData.toggleButtons.firstButtonText.content
    ? houseImg : pepperImg;

    const logos = [houselogo, arrowImg, handshakelogo];
    const logoPicker = () => logos[Math.floor(Math.random() * 2)];


    return (
        <div className='finance-template' 
        style={FinanceData.globalRobotoFont}>
            <div className="finance-top-bar" 
            style={FinanceData.topBar.style}>

                <h3 className='finance-top-bar-header'
                style={{
                    fontSize: FinanceData.topBar.components.logo.style.fontSize + 'px',
                    color: FinanceData.topBar.components.logo.style.color
                }}>
                    {FinanceData.topBar.components.logo.content}
                </h3>

                <span className='search-bar-buttons-span'>
                    <span className='search-bar-search-icon'>
                        <input type="text" className="search-bar"/>
                        <img src={searchlogo} alt="" className='searchlogo-img'/>
                    </span> 

                    <span className='login-register-buttons'>
                        <button className='login-button' 
                        style={FinanceData.topBar.components.loginButton.style}>
                            {FinanceData.topBar.components.loginButton.content}
                        </button>

                        <button className='register-button' 
                        style={FinanceData.topBar.components.registerButton.style}>
                            {FinanceData.topBar.components.registerButton.content}
                        </button>
                    </span>
                </span>
            </div> 
            
            <div className='finance-hero-section'
            style={
                FinanceData.heroSection.style.backgroundImage.length > 0 
                ? {
                    backgroundImage : `url(${FinanceData.heroSection.style.backgroundImage})`
                } :{}
            }>

                <span className='hero-message'>
                    <h4 className='finance-hero-section-header'>
                        {FinanceData.heroSection.components.heroHeader.content}
                    </h4>
                    <p className='finance-hero-section-text'>
                   {FinanceData.heroSection.components.heroParagraph.content} 
                    </p>
                </span>

                <span className='toggle-buttons-span'>
                    <button 
                        className={currentButton === FinanceData.toggleButtons.firstButtonText.content 
                            ? 'active toggle-button': 'toggle-button'} 
                        onClick={handleActive} id={FinanceData.toggleButtons.firstButtonText.content} 
                        style={currentButton === FinanceData.toggleButtons.firstButtonText.content 
                        ? FinanceData.toggleButtons.activeButtonStyle
                        : FinanceData.toggleButtons.ButtonStyle}
                        >

                        {FinanceData.toggleButtons.firstButtonText.content}
                    </button>
                    <button 
                        className={currentButton === FinanceData.toggleButtons.secondButtonText.content 
                            ? 'active toggle-button': 'toggle-button'} 
                        onClick={handleActive} id={FinanceData.toggleButtons.secondButtonText.content}
                        style={currentButton === FinanceData.toggleButtons.secondButtonText.content 
                            ? FinanceData.toggleButtons.activeButtonStyle
                            : FinanceData.toggleButtons.ButtonStyle}>
                            
                        {FinanceData.toggleButtons.secondButtonText.content}
                    </button>
                </span>
            </div> 
            <div 
            className={currentButton === 'personal' 
            ? 'toggle-div toggle-div-personal-mode' 
            : 'toggle-div toggle-div-business-mode'}
            style={FinanceData.toggleButtons.activeButtonStyle}>
                {
                    toggleDivData.map((element) => (
                        <span className='toggle-div-component'>
                            <img src={logoPicker()} alt="" className='image'/>
                            <p className='text'>{element.text.content}</p>
                        </span>
                    ))
                }
            </div>
            <div className='section3' 
            style={FinanceData.section3.style}>
                {
                     section3_Data.map((element) => (
                        <div className='section3-inner-div'>
                            <span className='header-text-span'>
                                <h3 style={FinanceData.section3.components.globalFontStyle.headerStyle}>
                                    {element.header.content}
                                </h3>
                                <p style={FinanceData.section3.components.globalFontStyle.text}>
                                    {element.text.content}
                                </p>
                            </span>
                            <span className='image-span'>
                                <img src={section3_img} alt="" className='image'/>
                            </span>
                        </div>
                    ))
                }
            </div>
            <div className="section4" 
            style={FinanceData.section4.style}>
               { 
                    section4_Data.map((element) => (
                        <div className='section4-inner-div'>
                            <span className='header-text-span'>
                                <h3 style={FinanceData.section3.components.globalFontStyle.headerStyle}>
                                    {element.header.content}
                                </h3>
                                <p style={FinanceData.section3.components.globalFontStyle.text}>
                                    {element.text.content}
                                </p>
                            </span>
                            <span className='image-span'>
                                <img 
                                src={section4_img} alt="" className='image'/>
                            </span>
                        </div>
                    ))
                }
            </div>
            <div className="message-section">
                <span className='image-span'>
                    <img src={FinanceData.messageSection.image.length > 0 
                        ? FinanceData.messageSection.image 
                        : puzzleImg } alt="" 
                        className='image'/>
                </span>
                <MessageForm />
            </div>
           <Footer />
        </div>
    )
}