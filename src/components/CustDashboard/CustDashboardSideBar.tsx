import React from 'react'
import '../../assets/styles/custDashboardStyles/CustDashboardSideBar.scss';
import dashboardlogo from '../../assets/svg/grid-view-svgrepo-com.svg';
import orderslogo from '../../assets/svg/list-square-svgrepo-com.svg';
import { Outlet, Link } from 'react-router-dom';
import supportlogo from '../../assets/images/Vector (1).png';
import profilelogo from '../../assets/svg/Vector (1).png';


export const CustDashboardSideBar: React.FC = () => {
    return (
        <>
        <div className="cust-navigation-sidebar">
            <ul className='navigation-sidebar-list'>
                <li className='dashboard'>
                    <Link to="/custDashboard" className='link'>
                        <button className='dashboard-button'>
                            <img src={dashboardlogo} alt="" />
                            Stores
                        </button>
                    </Link>
                </li>

                <li className='custProject'>
                    <Link to="orders" className='link'>
                        <button className='dashboard-button'>
                            <img src={orderslogo} alt="" />
                            Orders
                        </button>
                    </Link>
                </li>

                <li className='custProfile'>
                    <Link to="profile" className='link'>
                        <button className='dashboard-button'>
                            <img src={profilelogo} alt="" />
                            Profile
                        </button>
                    </Link>
                </li>

                <li className='custSupport'>
                    <Link to="support" className='link'>
                        <button className='dashboard-button'>
                            <img src={supportlogo} alt="" />
                            Support 
                        </button>
                    </Link>
                </li>
            </ul>
        </div>
        <Outlet />
        </>
    )
}