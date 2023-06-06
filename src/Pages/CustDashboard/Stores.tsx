import { Route, Routes } from "react-router-dom";

import '../../assets/styles/custDashboardStyles/CustDashboardPages.scss';
//import { CustOrdersPage } from "./CustOrdersPage";
import EcommerceStoreHome from "./EcommerceStore/StoreHome";
import { CustDashboardPage } from "./CustDashboardPage";

const Stores: React.FC = () => {
    return (
        <div className="customer-orders-div">
                <Routes>
                   <Route index element={<CustDashboardPage />} />
                   <Route path="storehome" element={<EcommerceStoreHome />} />
                   
                </Routes>
        </div>
            
    )
};

export default Stores;