import { useState } from 'react'
import '../../assets/styles/templatesStyles/TemplatePreview.scss'
import Templates from '../../staticDB/templateData'
import Modal from 'react-modal'
import { Finance } from '../../Templates/Finance/Pages/Finance'
import EcommerceHome from '../../Templates/Ecommerce/Pages/EcommerceHome'
export interface templatesType{
    name: string,
    imgSrc: string,
    description: string
}
interface TemplatePreviewProps{
    category: string
}

export const TemplatesPreview: React.FC<TemplatePreviewProps> = (props) => {
    const [openModal, setModal] = useState(false);
    const [clickedTemplate, setClickedTemplate] = useState('');
    const { category } = props;
    
    
    const categoryData = Templates.find((c) => c.name === category);

    if(!categoryData){
        return null;
    }

    const handleModal = (event: React.MouseEvent<HTMLDivElement>) => {
        setModal(!openModal);
        setClickedTemplate(event.currentTarget.id);
        
        if(!localStorage.getItem('clickedTemplate')){
            localStorage.setItem('clickedTemplate', clickedTemplate);
        } else {
            localStorage.setItem('clickedTemplate', clickedTemplate);
        }
    }
        
    const getId = () => {
        if (clickedTemplate === 'Ecommerce1') {
            window.location.href= './templates/edit-template-page'
        } else if(clickedTemplate === 'Finance1'){
            window.location.href = './templates/edit-template-page'
        }
    }
    
    
    return(
        <div className='template-preview-container'>
            {categoryData.templates.map((template: templatesType) =>(
                <div className="template-preview" onClick={handleModal} id={template.description} key={template.description}>
                <div className="template-img-div"><img src={template.imgSrc} alt=""  className='template-img'/></div>
                <span className="template-text-span"><p className='template-text'>{template.name}</p></span>
                <Modal isOpen={openModal} preventScroll={true} style={{
                    content: {
                        width: '80vw',
                        height: '80vh',
                        display: 'flex',
                        position: 'absolute',
                        top: '0',
                        overflow: 'hidden',
                        contain: 'content',
                        WebkitOverflowScrolling: 'touch',
                        justifyContent: 'center',
                        margin: ' 5vh auto 5vh auto',
                    },
                    overlay: {
                        background: 'rgba(0, 0, 0, 0.25)',
                        backdropFilter: 'blur(2.5px)',
                        padding: '0',
                    }
                }}>
                    { clickedTemplate === 'Finance1' ? <Finance /> : '' }
                    { clickedTemplate === 'Ecommerce1' ? <EcommerceHome /> : '' }
                    
                    <button className='edit-template-button' onClick={getId}>
                        Edit
                    </button>
                    
                    
                </Modal>
            </div>
            ))}
        </div>
    )
}