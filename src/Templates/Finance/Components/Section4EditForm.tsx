import '../../../assets/styles/templatesStyles/Finance/Section4EditForm.scss'
import { useAppDispatch, useAppSelector } from '../../../store'
import { 
    setSection3BusinessHeader,
    setSection3BusinessImage,
    setSection3PersonalHeader,
    setSection3PersonalImage,
    setSection3BusinessText,
    setSection3PersonalText
    } from '../../../Redux/FinanceSlice'

export const Section4EditForm: React.FC = () => {
    const dispatch = useAppDispatch();

    const { personal, business} = useAppSelector(state => state.finance.section3.components);
    const handleSection3PersonalHeader = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSection3PersonalHeader(event.currentTarget.value));
    }
    const handleSection3BusinessHeader = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSection3BusinessHeader(event.currentTarget.value));
    }
    const handleSection3PersonalText = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSection3PersonalText(event.currentTarget.value));
    }
    const handleSection3BusinessText = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSection3BusinessText(event.currentTarget.value));
    }
    const handlePersonalImage = (event:React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files && event.target.files[0]){
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                dispatch(setSection3PersonalImage(reader.result as string))
            }
            reader.readAsDataURL(file)
      
        }
    }
    const handleBusinessImage = (event:React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files && event.target.files[0]){
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                dispatch(setSection3BusinessImage(reader.result as string))
            }
            reader.readAsDataURL(file)
      
        }
    }

    return (
        <div className="section4-form">
            <h4>Section 4</h4>
            <span className='label-input-span'>
                <label htmlFor="logo">Header 1</label>
                <input type="text" name='logo' 
                value={personal[0].header.content}
                onChange={handleSection3PersonalHeader}/>
            </span>
            <span className='label-input-span'>
                <label htmlFor="logo">Header 2</label>
                <input type="text" name='logo' 
                value={business[0].header.content}
                onChange={handleSection3BusinessHeader}/>
            </span>
         
            <span className='label-input-span'>
                <label htmlFor="logo">Text 1</label>
                <input type="text" name='logo' 
                value={personal[0].text.content}
                onChange={handleSection3PersonalText}/>
            </span>
            <span className='label-input-span'>
                <label htmlFor="logo">Text 2</label>
                <input type="text" name='logo' 
                value={business[0].text.content}
                onChange={handleSection3BusinessText}/>
            </span>

            <span className='color-color-span'>
                <span className='upload-image'>
                    <label htmlFor="">Upload Image 1</label>
                    <input type="file" accept='image/*'
                    onChange={handlePersonalImage}/>
                </span>
                <span className='upload-image'>
                    <label htmlFor="">Upload Image 2</label>
                    <input type="file" accept='image/*'
                    onChange={handleBusinessImage}/>
                </span>
            </span>
            
        </div>
    )
}