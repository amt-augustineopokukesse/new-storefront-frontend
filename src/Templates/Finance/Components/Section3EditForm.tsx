import React from 'react';
import '../../../assets/styles/templatesStyles/Finance/Section3EditForm.scss'
import { useAppDispatch, useAppSelector } from '../../../store'
import {
     setFirstHoverButtonText,
     setSecondHoverButtonText,
     setHoverButtonColour,
     settHoverButtonBackgorundColour,
     setHoverButtonActiveBacgroundColour,
     setHoverButtonActiveColour ,
     setToggleComponentText1,
     setToggleComponentText2,
     setToggleComponentText3,
     setToggleComponentText4,
     setToggleComponentText5
    } from '../../../Redux/FinanceSlice';

export const Section3EditForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const {
        firstButtonText, 
        secondButtonText, 
        activeButtonStyle, 
        ButtonStyle
    } = useAppSelector(state => state.finance.toggleButtons);

    const { personal, business } = useAppSelector(state => state.finance.toggleDiv.components);

    const handleFirstButtonText = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setFirstHoverButtonText(event.currentTarget.value));
    }
    const handleSecondButtonText = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSecondHoverButtonText(event.currentTarget.value));
    }
    const handleHoverButtonTextColour = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setHoverButtonColour(event.currentTarget.value));
    }
    const handleHoverButtonBackgroundColour = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(settHoverButtonBackgorundColour(event.currentTarget.value));
    }
    const handleHoverActiveButtonTextColour = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setHoverButtonActiveColour(event.currentTarget.value));
    }
    const handleHoverActiveButtonBackgroundColour = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setHoverButtonActiveBacgroundColour(event.currentTarget.value));
    }
    const handleToggleText1 = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setToggleComponentText1(event.currentTarget.value));
    }
    const handleToggleText2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setToggleComponentText2(event.currentTarget.value));
    }
    const handleToggleText3 = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setToggleComponentText3(event.currentTarget.value));
    }
    const handleToggleText4 = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setToggleComponentText4(event.currentTarget.value));
    }
    const handleToggleText5 = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setToggleComponentText5(event.currentTarget.value));
    }

    return(
        <div className='section3-form'>
            <h4>Section 3</h4>
            <span className='label-input-span'>
                <label htmlFor="logo">Button 1</label>
                <input type="text" name='logo' 
                value={firstButtonText.content}
                onChange={handleFirstButtonText}/>
            </span>
            <span className='label-input-span'>
                <label htmlFor="">Button 2</label>
                <input type="text" name='logo' 
                value={secondButtonText.content}
                onChange={handleSecondButtonText}/>
            </span>
            <span className='color-color-span'>
                <span className='label-input-span'>
                    <label htmlFor="logo">Text Colour</label>
                    <input type="color" name='logo' 
                    value={ButtonStyle.color}
                    onChange={handleHoverButtonTextColour}/>
                </span>
                <span className='label-input-span'>
                    <label htmlFor="logo">Background Colour</label>
                    <input type="color" name='logo' 
                    value={ButtonStyle.backgroundColor}
                    onChange={handleHoverButtonBackgroundColour}/>
                </span>
            </span>
                <span className='label-input-span'>
                    <label htmlFor="logo">Active Text Colour</label>
                    <input type="color" name='logo' 
                    value={activeButtonStyle.color}
                    onChange={handleHoverActiveButtonTextColour}/>
                </span>
                <span className='label-input-span'>
                    <label htmlFor="logo">Active Background Colour</label>
                    <input type="color" name='logo' 
                    value={activeButtonStyle.backgroundColor}
                    onChange={handleHoverActiveButtonBackgroundColour}/>
                </span>
                <span className='label-input-span'>
                    <label htmlFor="logo">Text 1</label>
                    <input type="text" name='logo' 
                    maxLength={20}
                    value={personal[0].text.content}
                    onChange={handleToggleText1}/>
                </span>
                <span className='label-input-span'>
                    <label htmlFor="logo">Text 2</label>
                    <input type="text" name='logo' 
                    maxLength={20}
                    value={personal[1].text.content}
                    onChange={handleToggleText2}/>
                </span>
                <span className='label-input-span'>
                    <label htmlFor="logo">Text 3</label>
                    <input type="text" name='logo' 
                    maxLength={20}
                    value={business[0].text.content}
                    onChange={handleToggleText3}/>
                </span>
                <span className='label-input-span'>
                    <label htmlFor="logo">Text 4</label>
                    <input type="text" name='logo' 
                    maxLength={20}
                    value={business[1].text.content}
                    onChange={handleToggleText4}/>
                </span>
                <span className='label-input-span'>
                    <label htmlFor="logo">Text 5</label>
                    <input type="text" name='logo' 
                    maxLength={20}
                    value={business[2].text.content}
                    onChange={handleToggleText5}/>
                </span>

        </div>
    )
}