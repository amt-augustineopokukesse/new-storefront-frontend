import '../../../assets/styles/templatesStyles/Finance/Section5EditForm.scss'
import { useAppDispatch, useAppSelector } from '../../../store'
import { 
    setSection4BusinessHeader,
    setSection4BusinessImage,
    setSection4BusinessText,
    setSection4PersonalHeader,
    setSection4PersonalImage,
    setSection4PersonalText
 } from '../../../Redux/FinanceSlice';

export const Section5EditForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const { personal, business } = useAppSelector(state => state.finance.section4.components);
    
    const handleSection4PersonalHeader = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSection4PersonalHeader(event.currentTarget.value));
    }
    const handleSection4BusinessHeader = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSection4BusinessHeader(event.currentTarget.value));
    }
    const handleSection4PersonalText = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSection4PersonalText(event.currentTarget.value));
    }
    const handleSection4BusinessText = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSection4BusinessText(event.currentTarget.value));
    }
    const handlePersonalImage = (event:React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files && event.target.files[0]){
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                dispatch(setSection4PersonalImage(reader.result as string))
            }
            reader.readAsDataURL(file)
      
        }
    }
    const handleBusinessImage = (event:React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files && event.target.files[0]){
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                dispatch(setSection4BusinessImage(reader.result as string))
            }
            reader.readAsDataURL(file)
      
        }
    }
    return (
        <div className="section5-form">
            <h4>Section 5</h4>
            <span className='label-input-span'>
                <label htmlFor="logo">Header 1</label>
                <input type="text" name='logo' 
                value={personal[0].header.content}
                onChange={handleSection4PersonalHeader}/>
            </span>
            <span className='label-input-span'>
                <label htmlFor="logo">Header 2</label>
                <input type="text" name='logo' 
                value={business[0].header.content}
                onChange={handleSection4BusinessHeader}/>
            </span>
         
            <span className='label-input-span'>
                <label htmlFor="logo">Text 1</label>
                <input type="text" name='logo' 
                value={personal[0].text.content}
                onChange={handleSection4PersonalText}/>
            </span>
            <span className='label-input-span'>
                <label htmlFor="logo">Text 2</label>
                <input type="text" name='logo' 
                value={business[0].text.content}
                onChange={handleSection4BusinessText}/>
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