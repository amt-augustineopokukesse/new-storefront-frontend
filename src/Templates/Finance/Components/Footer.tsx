import facebooklogo from '../../../assets/svg/templates-svg/facebook.svg'
import instagramlogo from '../../../assets/svg/templates-svg/instagram.svg'
import twitterlogo from '../../../assets/svg/templates-svg/twitter.svg'
import '../../../assets/styles/templatesStyles/Finance/Footer.scss'
import { useAppSelector } from '../../../store'

export const Footer: React.FC = () => {
    const { header, text, p1, p2 } = useAppSelector(state => state.finance.footer.components)
    return (
        <div className='footer'>
            <span className='footer-logo'>
                {header.content}
            </span>
            <span className='footer-text'>
                {text.content}
            </span>
            <span className='contact-span'>
                <span className='social-media-span'>
                    <a href=""><img src={facebooklogo} alt="" /> </a>
                    <a href=""><img src={instagramlogo} alt="" /></a>
                    <a href=""><img src={twitterlogo} alt="" /></a> 
                </span>
                <p>{p1.content}</p>
                <p>{p2.content}</p>
            </span>
        </div>
    )
}