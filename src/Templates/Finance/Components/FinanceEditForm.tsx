import React, { useState } from 'react'
import '../../../assets/styles/templatesStyles/Finance/FinanceEditForm.scss'
import { TopBarForm } from './TopBarForm';
import { Section2EditForm } from './Section2EditForm';
import { Section3EditForm } from './Section3EditForm';
import { Section4EditForm } from './Section4EditForm';
import { Section5EditForm } from './Section5EditForm';
import { Section6EditForm } from './Section6EditForm';
import { Section7EditForm } from './Section7EditForm';
import { Finance } from '../Pages/Finance';


export const FinanceEditForm: React.FC = () => {
    const [activeButton, setActiveButton] = useState('');

    const openSection =(event: React.MouseEvent) => {
        setActiveButton(event.currentTarget.id);
        console.log(activeButton)
    }
    
    return (
        <>
        <Finance />
        <div className='finance-edit-form'>
            {activeButton === 'section1' ? <TopBarForm /> : ''}
            {activeButton === 'section2' ?  <Section2EditForm /> : ''}
            {activeButton === 'section3' ? <Section3EditForm /> : ''}
            {activeButton === 'section4' ? <Section4EditForm /> : ''}
            {activeButton === 'section5' ? <Section5EditForm /> : ''}
            {activeButton === 'section6' ? <Section6EditForm /> : ''}
            {activeButton === 'section7' ? <Section7EditForm /> : ''}


            <div className='section-buttons'>
                <button className="section-button"
                 id='section1' 
                 onClick={openSection}>
                    Section 1
                </button>
                <button className="section-button"
                 id='section2' 
                 onClick={openSection}>
                    Section 2
                </button>
                <button className="section-button"
                 id='section3' 
                 onClick={openSection}>
                    Section 3
                </button>
                <button className="section-button"
                 id='section4' 
                 onClick={openSection}>
                    Section 4
                </button>
                <button className="section-button"
                 id='section5' 
                 onClick={openSection}>
                    Section 5
                </button>
                <button className="section-button"
                 id='section6' 
                 onClick={openSection}>
                    Section 6
                </button>
                <button className="section-button"
                 id='section7' 
                 onClick={openSection}>
                    Section 7
                </button>
                <button className='save-button'>Save</button>
                <button className='publish-button'>Publish</button>
            </div>
        </div>
        </>
    )
}