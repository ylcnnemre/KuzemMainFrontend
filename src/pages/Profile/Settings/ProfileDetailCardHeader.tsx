import React, { FC } from 'react'
import { CardHeader, Nav, NavItem, NavLink } from 'reactstrap';
import withRouter from '../../../Components/Common/withRouter';
import { withTranslation } from 'react-i18next';
import classNames from 'classnames';

interface ProfileDetailCardHeaderProps {
    t: (key: string) => string;  // t fonksiyonunun türü, i18n çeviri fonksiyonu için genel bir tanım
    tabChange: (tabId: string) => void;  // tabChange fonksiyonunun türü
    activeTab: string;  // activeTab prop'unun türü
}


const ProfileDetailCardHeader: FC<ProfileDetailCardHeaderProps> = ({ activeTab, t, tabChange }) => {

    return (
        <CardHeader>
            <Nav className="nav-tabs-custom rounded card-header-tabs border-bottom-0"
                role="tablist">
                <NavItem>
                    <NavLink
                        className={classNames({ active: activeTab === "1" })}
                        onClick={() => {
                            tabChange("1");
                        }}>
                        <i className="fas fa-home"></i>
                        {t("PersonelDetail")}
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="#"
                        className={classNames({ active: activeTab === "2" })}
                        onClick={() => {
                            tabChange("2");
                        }}
                        type="button">
                        <i className="far fa-user"></i>
                        {t("ChangePassword")}
                    </NavLink>
                </NavItem>
                <NavItem >
                    <NavLink to="#"
                        className={classNames({ active: activeTab === "3" })}
                        onClick={() => {
                            tabChange("3");
                        }}
                        type="button">
                        <i className="far fa-envelope"></i>
                        {t("Experince")}
                    </NavLink>
                </NavItem>

            </Nav>
        </CardHeader>
    )
}

export default withRouter(withTranslation()(ProfileDetailCardHeader))