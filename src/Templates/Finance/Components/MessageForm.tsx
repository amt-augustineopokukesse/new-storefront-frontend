import '../../../assets/styles/templatesStyles/Finance/MessageForm.scss'

export const MessageForm: React.FC = () => {
    return (
        <div className='finance-form-div'>
            <form action="" className='form'>
                <input type="text" placeholder="Type name here" className='name-input'/>
                <input type="text" placeholder="test1@gmail.com" className='email-input'/>
                <label htmlFor="message-box">Message</label>
                <textarea name="message-box" 
                    id="message-box" cols={10} rows={10} 
                    placeholder='Hello Storefront, I would like to talk to you about:'>
                </textarea>
                <button type='submit' className='submit-button'>Submit</button>
            </form>
        </div>
    )
}