import '../../../assets/styles/templatesStyles/Finance/Section7EditForm.scss'
import { useAppDispatch, useAppSelector } from '../../../store'
import { setFooterP1, setFooterP2, setFooterHeader, setFooterText } from '../../../Redux/FinanceSlice';

export const Section7EditForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const section7 = useAppSelector(state => state.finance.footer);
    const handleFooterHeader = (event:React.ChangeEvent<HTMLInputElement>) => {
       dispatch(setFooterHeader(event.currentTarget.value));
    }
    const handleFooterText = (event:React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setFooterText(event.currentTarget.value));
    }
    const handleFooterp1 = (event:React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setFooterP1(event.currentTarget.value));
    }
    const handleFooterp2 = (event:React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setFooterP2(event.currentTarget.value));
    }
    return (
        <div className="section7-form">
            <h4>Section 7</h4>
            <span className='label-input-span'>
                <label htmlFor="logo">Logo</label>
                <input type="text" name='' 
                value={section7.components.header.content}
                onChange={handleFooterHeader}/>
            </span>
            <span className='label-input-span'>
                <label htmlFor="">Text</label>
                <input type="text" name='' 
                value={section7.components.text.content}
                onChange={handleFooterText}/>
            </span>
            <span className='label-input-span'>
                <label htmlFor="">Contact 1</label>
                <input type="number" name='' 
                value={section7.components.p1.content}
                onChange={handleFooterp1}/>
            </span>
            <span className='label-input-span'>
                <label htmlFor="">Contact 2</label>
                <input type="number" name='' 
                value={section7.components.p2.content}
                onChange={handleFooterp2}/>
            </span>
        </div>
    )
}