import { Route, Routes } from "react-router-dom";
import { SupportPage } from "./SupportPage";
import '../../assets/styles/dashboardStyles/DasboardPages.scss';
import ProjectsAndTemplates from "./ProjectsAndTemplates";
import { DashboardPage } from "./DashboardPage";
import { ProfilePage } from "./ProfilePage";
import { CustomersPage } from "./CustomersPage";

export const DashboardPages: React.FC = () => {
    return (
        <div className="dashboard-pages">
                <Routes>
                   <Route index element={<DashboardPage />} />
                   <Route path="/project/*" element={<ProjectsAndTemplates />} />
                   <Route path="profile" element={<ProfilePage user={{
                    profile_picture: '',
                    business_name: '',
                    email: '',
                   }} editForm={{
                    value: "",
                    editmode: false
                    }} />} />
                   <Route path="support" element={<SupportPage />} />
                   <Route path="customers-page" element={<CustomersPage />} /> 
                </Routes>
        </div>
            
    )
}

