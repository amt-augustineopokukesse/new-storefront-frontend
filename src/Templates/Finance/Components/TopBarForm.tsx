import React from 'react';
import '../../../assets/styles/templatesStyles/Finance/TopBarForm.scss'
import { useAppSelector, useAppDispatch } from '../../../store'
import { 
    setTopBarLogoText, 
    setTopBarBackgroundColour, 
    setLoginButtonText, 
    setLoginButtonColour,
    setRegisterButtonText,
    setRegisterButtonColour,
    setTopBarLogoTextColour,
    setTopBarLogoTextFontSize
} from '../../../Redux/FinanceSlice';

export const TopBarForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const { logo ,loginButton, registerButton } = useAppSelector(state => state.finance.topBar.components);
    const { style } = useAppSelector(state => state.finance.topBar)

    const handleLogoText = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setTopBarLogoText(event.currentTarget.value));
    }
    const handleTopBarLogoFont = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setTopBarLogoTextFontSize(event.currentTarget.value))
    }
    const handleLogoColour = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setTopBarLogoTextColour(event.currentTarget.value))
    }
    const handleTopBarBackground = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setTopBarBackgroundColour(event.currentTarget.value));
    }
    const handleLoginText = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setLoginButtonText(event.currentTarget.value))
    }
    const handleLoginColour = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setLoginButtonColour(event.currentTarget.value))
    }
    const handleRegisterText = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setRegisterButtonText(event.currentTarget.value))
    }
    const handleRegisterColour = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setRegisterButtonColour(event.currentTarget.value))
    }
    return(
        <div className="section1-form">
            <h4>Section 1</h4>
            <span className='label-input-span'>
                <label htmlFor="">Logo</label>
                <input type="text" name='logo' 
                value={logo.content} 
                onChange={handleLogoText}/>
            </span>
            <span className='font-color-span'>
                <span className='label-input-span'>
                    <label htmlFor="font-size">Font Size</label>
                    <input type="number" name='font-size'
                    minLength={1}  
                    maxLength={2}
                    min={20}
                    max={45}
                    value={logo.style.fontSize}
                    onChange={handleTopBarLogoFont}/>
                </span>
                <span className='label-input-span'>
                        <label htmlFor="">Colour</label>
                        <input type="color" 
                        value={logo.style.color}
                        onChange={handleLogoColour}/>
                </span>
            </span>
                
            <span className='label-input-span'>
                <label htmlFor="button1">Text</label>
                <input type="text" name='button 1' 
                value={loginButton.content} 
                onChange={handleLoginText}/>
            </span>
            <span className='label-input-span'>
                    <label htmlFor="button1">Colour</label>
                    <input type="color" name='button 1' 
                    value={loginButton.style.color}
                    onChange={handleLoginColour}/>
            </span>
              
             <span className='label-input-span'>
                <label htmlFor="button2">Text</label>
                <input type="text" name='' 
                value={registerButton.content}
                onChange={handleRegisterText}/>
            </span>
            <span className='label-input-span'>
                    <label htmlFor="button2">Colour</label>
                    <input type="color" name=''
                    value={registerButton.style.color}
                    onChange={handleRegisterColour}/>
            </span>
            <span className='label-input-span'>
                    <label htmlFor="">Background colour</label>
                    <input type="color" name='button 2' 
                    value={style.backgroundColor} 
                    onChange={handleTopBarBackground}/>
            </span>
              
        </div>
    )
}