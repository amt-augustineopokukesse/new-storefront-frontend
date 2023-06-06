import { HeaderText } from "../HeaderText";
import '../../assets/styles/custDashboardStyles/CustDashboardTopBar.scss';
import { CustProfile } from "./CustProfile";

export const CustDashboardTopBar: React.FC = () => {
    return (
        <div className="dashboard-top-bar">
            <CustProfile />
            <HeaderText />
        </div>
    )
}