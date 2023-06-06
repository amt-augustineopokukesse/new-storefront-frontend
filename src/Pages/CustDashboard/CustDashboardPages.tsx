import { Route, Routes } from "react-router-dom";
import { CustProfilePage } from "./CustProfilePage";
import { CustSupportPage } from "./CustSupportPage";
import '../../assets/styles/custDashboardStyles/CustDashboardPages.scss';
import { CustOrdersPage } from "./CustOrdersPage";
import Stores from "./Stores";


export const CustDashboardPages: React.FC = () => {
    return (
        <div className="cust-dashboard-pages">
                <Routes>
                   <Route index element={<Stores />} />
                   <Route path="orders" element={<CustOrdersPage />} />
                   <Route path="profile" element={<CustProfilePage />} />
                   <Route path="support" element={<CustSupportPage />} /> 
                </Routes>
        </div>
            
    )
}