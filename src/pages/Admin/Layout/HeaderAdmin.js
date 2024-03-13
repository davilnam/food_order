import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../../actions/actions';
import default_avatar from '../../../assets/images/default_avatar.png'
import { FaBars } from "react-icons/fa";

const HeaderAdmin = () => {
    const dispatch = useDispatch();
    let { user } = useSelector(state => state.app);    

    const handleOnclick = () => {
        dispatch(toggleSidebar());
    }

    return (
        <nav className="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0">
            <span className="sidebar-toggler flex-shrink-0" onClick={handleOnclick}>
                <FaBars />
            </span>
            <form className="d-none d-md-flex ms-4">
                <input className="form-control border-0" type="search" placeholder="Search" />
            </form>
            <div className="navbar-nav align-items-center ms-auto">
                <div className="nav-item dropdown">
                    <a href="/profile" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                        <img className="rounded-circle me-lg-2" src={default_avatar} alt=""
                            style={{ width: "40px", height: "40px" }} />
                        <span className="d-none d-lg-inline-flex">Nam</span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
                        <a href="profile.html" className="dropdown-item">My Profile</a>
                        <a href="home.html" className="dropdown-item">Log Out</a>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default HeaderAdmin;
