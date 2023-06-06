import Blogimg1 from '../assets/images/Blog-template1.png'
import Blogimg3 from '../assets/images/Blog-template3.png'
import Blogimg2 from '../assets/images/image for mountain blog.png'
import financeImg from '../assets/images/finance1.png'
import ecommImg1 from '../assets/images/ecomm1.png'
import ecommImg2 from '../assets/images/ecomm2.png'

const Templates = [
    {
      name: 'Blog',
      templates: [
        {
          name: 'Template 1',
          imgSrc: Blogimg1,
          description: 'Blog1'
        },
        {
          name: 'Template 2',
          imgSrc: Blogimg3,
          description: 'Blog2'
        },
        {
          name: 'Template 3',
          imgSrc: Blogimg2,
          description: 'Blog3'
        }
      ]
    },
    {
        name: 'Finance',
        templates: [
          {
            name: 'Template 1',
            imgSrc: financeImg,
            description: 'Finance1'
          }
        ]
      },
      {
        name: 'Ecommerce',
        templates: [
          {
            name: 'Template 1',
            imgSrc: ecommImg1,
            description: 'Ecommerce1'
          },
          {
            name: 'Template 2',
            imgSrc: ecommImg2,
            description: 'Ecommerce2'
          },
        ]
      },
]
export default Templates