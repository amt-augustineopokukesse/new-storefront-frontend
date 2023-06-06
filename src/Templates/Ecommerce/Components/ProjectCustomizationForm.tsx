import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../store';
import { useNavigate } from 'react-router-dom';

import '../../../assets/styles/templatesStyles/Ecommerce/ProjectCustomizationForm.scss';
import { StylingForm } from './StylingForm';
import UploadForm from './UploadForm';
import ProductsForm from './ProductsForm';
import ProjectDetailsForm from './ProjectDetailsForm';
import { AuthLoader } from '../../../components/authComponents/AuthLoader';
import { toast } from 'react-toastify';
import { publishProject, saveProject, updateProject } from '../../../Redux/Templates/ProjectActions';
import PagesForm from './PagesForm';

const ProjectCustomizationForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const project = useAppSelector((state) => state.project);
  const [activeMenu, setActiveMenu] = useState('Details');
  const [loader, setLoader] = useState<boolean>(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const storedProject = localStorage.getItem('project');
    if (storedProject?.length) {
      const savedProject = JSON.parse(storedProject)

      if (savedProject && savedProject.id) {
        setActive(true);
     }
    }
  },[]);

  const renderForm = () => {
    /** Render the appropriate form based on the active menu*/
    switch (activeMenu) {
      case 'Details':
        return <ProjectDetailsForm project={project} />;
      case 'Styling':
        return <StylingForm project={project} />;
      case 'Upload':
        return <UploadForm />;
      case 'Products':
        return <ProductsForm />;
      case 'Pages':
        return <PagesForm project={project}/>;
      default:
        return null;
    }
  };

  const handleSave = async () => {
    setLoader(true);
    try {
      const response = await dispatch(saveProject(project));
      if (response) {
      if (response.payload.data) {
        localStorage.setItem('project', JSON.stringify(response.payload.data));
      
        toast.success("Created project successfully 👏 You can publish it Now! or Later")
        setTimeout(()=>{
          setLoader(false);
        }, 500)
        setActive(true);
        navigate("/dashboard/project/");
        return;
      } } else {
        throw Error()
      }
    } catch (error) {
      setLoader(false);
      toast.error("Error Saving Project")
      return;
    }
  }

  const handleUpdate = async () => {
    setLoader(true);
    try {
      const response = await dispatch(updateProject(project));
      if (response.payload.data) {
        localStorage.setItem('project', JSON.stringify(response.payload.data));
        toast.success("Updated the project successfully")
        setTimeout(()=>{
          setLoader(false);
        }, 500)
        setActive(true);
        navigate("/dashboard/project/");
        return;
      } else throw Error("")
    } catch (error) {
      setLoader(false);
      toast.error("Error Saving Project")
      return;
    }
  };

  const handlePublish = async () => {
    setLoader(true);
    try {
      const response = await dispatch(publishProject());
      
      if (response.payload.data) {
        localStorage.setItem('project', JSON.stringify(response.payload.data));
        toast.success("Huraayy 🥳🎉 Your Project Live 👍 Our Customers can make purchases on your New Website👏 Make MONEY 💵!!🤝");
        setTimeout(()=>{
          setLoader(false);
        }, 500);
        setActive(true);
        navigate("/dashboard/project/");
        return;
      } else throw Error("")
    } catch (error) {
      toast.error("Error Publishing Project")
      return;
    }
  }

  return (
    <div className="customization-container">
      <h2 className="form-header">Customise Your Store</h2>
      <div className="template-customization">
        <div className="sidebar">
          <ul>
            <li onClick={() => setActiveMenu('Details')}>Project Details</li>
            <li onClick={() => setActiveMenu('Styling')}>Styling</li>
            <li onClick={() => setActiveMenu('Upload')}>Upload</li>
            <li onClick={() => setActiveMenu('Products')}>Products</li>
            <li onClick={() => setActiveMenu('Pages')}>Add Pages</li>
          </ul>
        </div>
        <div className="formDiv">
          {renderForm()}
          <div className="form-buttons">
            {active ? (
              <button onClick={handleUpdate} className="button update">
                Update
              </button>
            ) : (
              <button onClick={handleSave} className="button save">
                Save
              </button>
            )}
            <button disabled={!active} type="submit" className="button" onClick={handlePublish}>
              Publish
            </button>
          </div>
          {loader ? <AuthLoader /> : null}
        </div>
      </div>
    </div>
  );
};

export default ProjectCustomizationForm;
