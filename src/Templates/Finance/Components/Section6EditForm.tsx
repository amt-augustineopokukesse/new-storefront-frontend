import '../../../assets/styles/templatesStyles/Finance/Section6EditForm.scss'
import { useAppDispatch } from '../../../store'
import { setSection5Image } from '../../../Redux/FinanceSlice';

export const Section6EditForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const handlePersonalImage = (event:React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files && event.target.files[0]){
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                dispatch(setSection5Image(reader.result as string))
            }
            reader.readAsDataURL(file)
      
        }
    }
    return (
        <div className="section6-form">
             <h4>Section 6</h4>
             <span className='upload-image'>
                <label htmlFor="">Upload Image</label>
                <input type="file" accept='image/*'
                onChange={handlePersonalImage}/>
            </span>
        </div>
    )
}