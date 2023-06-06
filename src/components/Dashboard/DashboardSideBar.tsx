import React from 'react'
import '../../assets/styles/dashboardStyles/DashboardSideBar.scss';
import dashboardlogo from '../../assets/svg/grid-view-svgrepo-com.svg';
import projectlogo from '../../assets/svg/list-square-svgrepo-com.svg';
import profilelogo from '../../assets/svg/briefcase-svgrepo-com.svg';
import { Outlet, Link } from 'react-router-dom';
import supportlogo from '../../assets/images/Vector (1).png';

export const DashboardSideBar: React.FC = () => {
    return (
        <>
        <div className="navigation-sidebar">
            <ul className='navigation-sidebar-list'>
                <li className='dashboard'>
                    <Link to="/dashboard" className='link'>
                        <button className='dashboard-button'>
                            <img src={dashboardlogo} alt="" />
                            Dashboard 
                        </button>
                    </Link>
                </li>

                <li className='project'>
                    <Link to="project" className='link'>
                        <button className='dashboard-button'>
                            <img src={profilelogo} alt="" />
                            Project
                        </button>
                    </Link>
                </li>

                <li className='profile'>
                    <Link to="profile" className='link'>
                        <button className='dashboard-button'>
                            <img src={projectlogo} alt="" />
                            Profile
                        </button>
                    </Link>
                </li>

                <li className='support'>
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