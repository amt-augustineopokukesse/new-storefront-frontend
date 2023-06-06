import { HeaderText } from "../HeaderText";
import { MerchantProfile } from "./MerchantProfile";
import '../../assets/styles/dashboardStyles/DashboardTopBar.scss';

export const DashboardTopBar: React.FC = () => {
    return (
        <div className="dashboard-top-bar">
            <MerchantProfile />
            <HeaderText />
        </div>
    )
}