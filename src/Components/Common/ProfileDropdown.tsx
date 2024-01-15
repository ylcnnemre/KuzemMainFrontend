import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { CgProfile } from "react-icons/cg";
import { IoHelpCircleOutline } from "react-icons/io5";
import { MdOutlineSettings } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import avatar1 from "../../assets/images/users/avatar-1.jpg";
import useUserStore from '../../zustand/useUserStore';
import withRouter from './withRouter';
import { withTranslation } from 'react-i18next';

const ProfileDropdown = ({ t }: any) => {
    const { logoutUserSuccess } = useUserStore()
    const { user } = useUserStore()

    const [isProfileDropdown, setIsProfileDropdown] = useState(false);
    const toggleProfileDropdown = () => {
        setIsProfileDropdown(!isProfileDropdown);
    };
    return (
        <React.Fragment>
            <Dropdown isOpen={isProfileDropdown} toggle={toggleProfileDropdown} className="ms-sm-3 header-item topbar-user">
                <DropdownToggle tag="button" type="button" className="btn">
                    <span className="d-flex align-items-center">
                        <img className="rounded-circle header-profile-user" src={avatar1}
                            alt="Header Avatar" />
                        <span className="text-start ms-xl-2">
                            <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">{user.name}</span>
                           {/*  <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">Founder</span> */}
                        </span>
                    </span>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                    <h6 className="dropdown-header">{t("Welcome")} {user.name}!</h6>
                    <DropdownItem className='p-0'>
                        <Link to="/profile" className="dropdown-item">
                            <CgProfile size={"1.2rem"} style={{ marginRight: "10px" }} />
                            <span className="align-middle">
                                {t("Profile")}
                            </span>
                        </Link>
                    </DropdownItem>
                    <DropdownItem className='p-0'>
                        <Link to="/pages-faqs" className="dropdown-item">
                            <IoHelpCircleOutline size={"1.2rem"} style={{ marginRight: "10px" }} />
                            <span
                                className="align-middle">
                                {t("Help")}
                            </span>
                        </Link>
                    </DropdownItem>
                    <div className="dropdown-divider"></div>
                    <DropdownItem className='p-0'>
                        <Link to="/pages-profile-settings" className="dropdown-item">
                            <MdOutlineSettings style={{ marginRight: "10px" }} />
                            <span
                                className="align-middle">
                                {t("Settings")}
                            </span>
                        </Link>
                    </DropdownItem>

                    <DropdownItem className='p-0'>
                        <p className="dropdown-item" onClick={() => {
                            logoutUserSuccess()
                        }} >
                            <FiLogOut style={{ marginRight: "10px" }} />
                            <span
                                className="align-middle" data-key="t-logout">
                                {t("Logout")}
                            </span>
                        </p>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </React.Fragment>
    );
};

export default withRouter(withTranslation()(ProfileDropdown))