import arrowImg from '../assets/images/finance Vector.png'
import houselogo from '../assets/images/house Vector.png'
import houseImg from '../assets/images/houseImg.png'
import familyImg from '../assets/images/boy-with-his-father.png'
import teamImg from '../assets/images/team-high-five.png'
import pepperImg from '../assets/images/pepper.png'

const TemplateData = {
    topBar: {
        logo: 'LOGO',
    },
    heroSection: {
        heroHeader: 'Disover Lorem Ipsum',
        heroParagraph: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis 
        molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan,
         risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget 
         condimentum velit, sit amet feugiat lectus.`
    },
    toggleButtons: {
        firstButtonText: 'Personal',
        secondButtonText: 'Business'
    },
    toggleDiv: {
        personal: [
            {
                text: 'Open an acount',
                image: houselogo
            },
            {
                text: 'Manage your money',
                image: arrowImg
            }
        ],
        business: [
            {
                text: 'Reqeust a loan',
                image: arrowImg
            },
            {
                text: 'Open an investment account',
                image: houselogo
            },
            {
                text: 'Manage your money',
                image: arrowImg
            }
        ]
    },
    section3: {
        personal: [
            {
                header: 'Lorem Mountain Blog',
                text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec 
                fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. 
                Maecenas eget condimentum velit, sit amet feugiat lectus.`,
                image: familyImg
            } ],
        business: [
            {
                header: 'Lorem Mountain Blog',
                text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, 
                dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem 
                sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, 
                sit amet feugiat lectus.`,
                image: teamImg
            } ]
        },
    section4: {
        personal: [
        {
            header: 'Lorem Mountain Blog',
            text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, 
            dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem 
            sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, 
            sit amet feugiat lectus.`,
            image: houseImg
        } ],
        business: [
        {
            header: 'Lorem Mountain Blog',
            text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, 
            dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem 
            sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, 
            sit amet feugiat lectus.`,
            image: pepperImg
        }]
    },
    footer: {
        header: 'LOGO',
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Nulla est purus, ultrices in porttitor
        in, accumsan non quam.`,
        p1: 'Customer care',
        p2: '+233 24 123 4567'

    }
        
}

export default TemplateData;