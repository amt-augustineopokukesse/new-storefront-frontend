import { DashboardTopBar } from "../../components/Dashboard/DashboardTopBar"
import { DashboardSideBar } from "../../components/Dashboard/DashboardSideBar"
import { DashboardPages } from "./DashboardPages"
import { BiLogIn, BiLogOut } from "react-icons/bi";
import '../../assets/styles/dashboardStyles/Dashboard.scss';
import { useState } from "react";


export const Dashboard: React.FC = () => {

    const [ sidebarDisplay, setSidebarDisplay ] = useState("flex");

    const handleOpenSideBar = () => {
        setSidebarDisplay(sidebarDisplay === "flex" ? "none" : "flex")
    }

    return (
        <div className="dashboard">
            {/* <Router > */}
                <div className="sidebar-tray" onClick={handleOpenSideBar}>
                    {sidebarDisplay === "flex" ? <BiLogOut /> : <BiLogIn />}
                </div>
                <DashboardTopBar />
                <div className="sidebar-pages-conatiner">
                    <DashboardSideBar />
                    <div className="pages-container">
                        <DashboardPages />
                    </div>
                </div>
               
                
            {/* </Router> */}
            
        </div>
        
    )
}