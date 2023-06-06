import { Route, Routes } from "react-router-dom";
import { ProjectPage } from "./ProjectPage";
import TemplatesAndCustomize from "./TemplatesAndCustomize";
import { EditTemplatePage } from "../EditTemplate/EditTemplatePage";

const ProjectsAndTemplates: React.FC = () => {
    return (
                <Routes>
                   <Route index element={<ProjectPage />} />
                   <Route path='edit-template-page' element={<EditTemplatePage />} />
                   <Route path="templates/*" element={<TemplatesAndCustomize />}/>
                </Routes>
            
    )
}

export default ProjectsAndTemplates;