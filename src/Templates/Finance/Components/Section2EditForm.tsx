import React from 'react';
import '../../../assets/styles/templatesStyles/Finance/Section2EditForm.scss'
import { useAppSelector,useAppDispatch } from '../../../store'
import { setHeroSectionHeader, setHeroSectionHeaderText, setHeroSectionImage } from '../../../Redux/FinanceSlice';

export const Section2EditForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const { heroHeader, heroParagraph } = useAppSelector(state => state.finance.heroSection.components);

    const handleHeroHeader = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setHeroSectionHeader(event.currentTarget.value));
    }
    const handleHeroHeaderText = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setHeroSectionHeaderText(event.currentTarget.value));
    }
    const handleHeroImage = (event:React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files && event.target.files[0]){
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                dispatch(setHeroSectionImage(reader.result as string))
            }
            reader.readAsDataURL(file)
      
        }
    }

    return (
        <div className='section2' id='section2'>
            <h4>Section 2</h4>
            <span className='label-input-span'>
                <label htmlFor="">Header</label>
                <input type="text" name="" id="" 
                className='header-input-style'
                maxLength={40}
                value={heroHeader.content}
                onChange={handleHeroHeader}/>
            </span>
            <span className='label-input-span'>
                <label htmlFor="">Parargraph</label>
                <input type="text" name="" id="" 
                className='header-input-style'
                value={heroParagraph.content}
                onChange={handleHeroHeaderText}/>
            </span>
            <span className='upload-image'>
                <label htmlFor="">Upload Image</label>
                <input type="file" accept='image/*'
                onChange={handleHeroImage}/>
            </span>
        </div>
    )
}