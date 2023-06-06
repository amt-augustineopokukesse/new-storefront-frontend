import { useState } from 'react'
import '../../assets/styles/dashboardStyles/SupportPage.scss'

export const SupportPage: React.FC = () => {

    const [sendMessage, setSendMessage] = useState(false);

    const handleSentMessage = () => {
        setTimeout(() => {
            setSendMessage(true);
        }, 1000);
        
        setTimeout(()=> {
            setSendMessage(false)
        }, 3000)
    }
    return (
        <div className='support-page'>
            <textarea className='message-box' placeholder='Hello Storefront, I would like to talk to you about:' />
            <span className='send-span'>
                <button type='submit' className='send-message-button' onClick={handleSentMessage}>Send</button>
            </span>
            <span className={sendMessage === true ? 'sent-message-notification' : 'none'}>Message sent successfully</span>
        </div>
    )
}