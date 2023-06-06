import { CustDashboardTopBar } from "../../components/CustDashboard/CustDashboardTopBar"
import { CustDashboardSideBar } from "../../components/CustDashboard/CustDashboardSideBar"
import { CustDashboardPages } from "./CustDashboardPages"
import '../../assets/styles/custDashboardStyles/CustDashboard.scss';


export const CustDashboard: React.FC = () => {
    return (
        <div className="dashboard">
            {/* <Router > */}
                <CustDashboardTopBar />
                <div className="sidebar-pages-conatiner">
                    <CustDashboardSideBar />
                    <div className="pages-container">
                        <CustDashboardPages />
                    </div>
                </div>
               
                
            {/* </Router> */}
            
        </div>
        
    )
}