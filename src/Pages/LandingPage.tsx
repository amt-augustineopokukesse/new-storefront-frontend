import '../assets/styles/LandingPage.scss'
import laptop from '../assets/images/laptop.png';
import mobile from '../assets/images/mobile.png';
import team1 from '../assets/images/Ellipse 1.png';
import team2 from '../assets/images/Ellipse 3.png';
import team3 from '../assets/images/Ellipse 4.png';
import templateImg1 from '../assets/images/Frame 10.png';
import templateImg2 from '../assets/images/Desktop - 3 1.png';
import { TopBar } from '../components/TopBar';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AuthLoader } from '../components/authComponents/AuthLoader';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';



const LandingPage: React.FC = () => {
  const [ loader, setLoader ] = useState<boolean>(false);

  const { id } = useParams();

  const getUserData = async (id: string) => {
    setLoader(true);
    localStorage.setItem("token", id);
    toast.success("Login succesful")
    window.location.href = "/landing";
    
    setLoader(false);
    return;
}

  useEffect(() => {

    if (id) {
        getUserData(id)
    }
  }, [id])

    return (
        <div className="landingpage-container">
            <TopBar />
            <div className="getStarted-section">
                <div className="getStarted-text">
                    <h1 className='getStarted-h1'><span>More than</span><span>Just templates</span></h1>
                    <p className='getStarted-p'>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Recusandae culpa aut tempora ex reprehenderit fuga, libero aliquam
                        consequuntur
                    </p>
                    <Link to='/login'>
                        <button className='getStarted-button'>Get Started</button>
                    </Link>
                </div>
                <span className="getStarted-img">
                    <img id='laptop' src={laptop} alt="" />
                    <img id='mobile' src={mobile} alt="" />
                </span>
            </div>
            <div className="team-section">
                {loader ? <AuthLoader /> : ''}
                <span className="header">
                    <h3>Meet the team</h3>
                </span>
                <div className="team">
                    <div className='team-text-img team1'>
                        <img className='team-img' src={team1} alt="" />
                        <p className='team-text'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                             Voluptates iure dolore ipsam magnam, sit eveniet perferendis porro placeat cum,
                             vel blanditiis totam impedit aperiam, modi distinctio commodi in voluptas cumque.
                        </p>
                    </div>
                    <div className='team-text-img team2'>
                        <img className='team-img' src={team2} alt="" />
                        <p className='team-text'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                             Itaque optio qui omnis quo minima distinctio praesentium?
                             Numquam laborum explicabo facilis doloribus ea ex. Est sequi expedita eaque
                              quisquam voluptate doloremque.
                        </p>
                    </div>
                    <div className='team-text-img team3'>
                        <img className='team-img' src={team3} alt="" />
                        <p className='team-text'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                             Dolor facere laborum, quis porro voluptas id iste atque,
                             ea odit nulla ipsa accusantium incidunt, cumque accusamus eum labore.
                             Eum, assumenda suscipit!
                        </p>
                    </div>
                </div>
            </div>
            <div className="categories-section">
                <div className="categories-list">
                    <h4 className='categories-list-item' id='category1'>Landing page</h4>
                    <h4 className='categories-list-item' id='category2'>Eccomerce</h4>
                    <h4 className='categories-list-item' id='category3'>Blogs</h4>
                    <h4 className='categories-list-item' id='category4'>Portfolio</h4>
                    <h4 className='categories-list-item'id='category5'>Hiring</h4>
                </div>
                <span className="categories-img">
                    <img className='categories-img1' src={templateImg1} alt="" />
                    <img className='categories-img2' src={templateImg2} alt="" />
                </span>
            </div>
            <div className="footer-section">
                <h4 className='footer-header'>Lorem ipsum dolor sit amet</h4>
                <p className='footer-text'>
                consectetur adipiscing elit.
                Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
                Class aptent taciti sociosqu ad litora torquent per conubia nostra,
                per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.
                Class aptent taciti sociosqu ad litora torquent per conubia nostra.
                </p>
            </div>
        </div>
    )
}
export default LandingPage;
