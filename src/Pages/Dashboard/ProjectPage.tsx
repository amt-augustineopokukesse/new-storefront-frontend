import { useEffect, useState } from 'react';
import '../../assets/styles/dashboardStyles/ProjectPage.scss'
import filelogo from '../../assets/svg/icons8-file.svg'
import pluslogo from '../../assets/svg/icons8-plus-math-50.png'
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { initialProjectState } from '../../Redux/Templates/ProjectInitialState';
import { toast } from 'react-toastify';
import { AuthLoader } from '../../components/authComponents/AuthLoader';
import { getStores } from '../../Redux/Templates/ProjectActions';
import { setProject } from '../../Redux/Templates/ProjectSlice';

type store = {
    [key: string]: any;
}

export const ProjectPage: React.FC<store> = (props) => {

    const { allStores } = props;
    const [ stores, setStores ] = useState(allStores);
    const [loader, setLoader] = useState<boolean>(false);


    const dispatch = useAppDispatch();

    const getAllStores = async () => {
        try {
            const response = await dispatch(getStores());
            if (response) {
                setStores(response.payload.data);
                setTimeout(()=>{
                    setLoader(false);
                }, 500);
            }
        } catch (error) {
            setLoader(false);
            toast.error("Error Retrieving Storefront Stores")
            return;
        }
    }
    useEffect(() => {
        setLoader(true);
        getAllStores();
    },[]);

    const handleTakeDownProject = () => {
        localStorage.removeItem('project');
        dispatch(setProject(initialProjectState));
    }
    

    return (
        <div className='project-page'>
            <Link to='templates' className='router-link' >
            <button onClick={handleTakeDownProject} className='new-project-button'>
                <span className='filelogo-name-span'>
                    <img src={filelogo} alt="" />
                    New Project
                </span>
                <img className='plus' src={pluslogo} alt="" />
            </button>
            </Link>
            <div className="recent-projects">
                {
                    stores && stores.projects.length ?                     
                        <h3 className='recent-projects-header'>Recents</h3>
                    : <h3 className='recent-projects-header'>You have no recent projects</h3>
                }
                <div className='display-projects'>
                    {
                        stores && stores.projects.length ? 
                        
                        stores.projects.map((project:any, index: number) => 
                        <Link to="templates/edit-template-page" state={{linkedProject: project}}>
                            <div key={index} className='project-display' style={{backgroundImage: `url(${project.bannerUrl})`}}>
                                <div className='project-words'>
                                    <p><b>Store:</b> {project.name}</p>
                                    <p><b>Category:</b> {project.category}</p>
                                    <p><b>Published:</b> {project.published ? "True" : "False"}</p>
                                </div>
                            </div>
                        </Link>)
                        
                    :   ""
                    }

                </div>
            </div>
            {loader && <AuthLoader />}
        </div>
    )
}