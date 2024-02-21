import React, { useEffect, useCallback, useMemo } from 'react';
import { Link } from "react-router-dom";
import withRouter from "../../Components/Common/withRouter";
import { Collapse } from 'reactstrap';
import navdata from "../LayoutMenuData";
import { withTranslation } from "react-i18next";
import useLayoutStore from '../../zustand/useLayoutStore';
import useUserStore from '../../zustand/useUserStore';
import { IoIosArrowDown } from 'react-icons/io';


const VerticalLayout = (props: any) => {
    const navData = navdata().props.children;

    const { user: { role, permission } } = useUserStore()
    const { leftsidbarSizeType, sidebarVisibilitytype, layoutType } = useLayoutStore()
    //vertical and semibox resize events
    const resizeSidebarMenu = useCallback(() => {
        var windowSize = document.documentElement.clientWidth;
        const humberIcon = document.querySelector(".hamburger-icon") as HTMLElement;
        var hamburgerIcon = document.querySelector(".hamburger-icon");
        if (windowSize >= 1025) {
            if (document.documentElement.getAttribute("data-layout") === "vertical") {
                document.documentElement.setAttribute("data-sidebar-size", leftsidbarSizeType);
            }
            if (document.documentElement.getAttribute("data-layout") === "semibox") {
                document.documentElement.setAttribute("data-sidebar-size", leftsidbarSizeType);
            }
            if ((sidebarVisibilitytype === "show" || layoutType === "vertical" || layoutType === "twocolumn") && document.querySelector(".hamburger-icon")) {
                if (hamburgerIcon !== null) {
                    hamburgerIcon.classList.remove("open");
                }
            } else {
                // var hamburgerIcon = document.querySelector(".hamburger-icon");
                if (hamburgerIcon !== null) {
                    hamburgerIcon.classList.add("open");
                }
            }

        } else if (windowSize < 1025 && windowSize > 767) {
            document.body.classList.remove("twocolumn-panel");
            if (document.documentElement.getAttribute("data-layout") === "vertical") {
                document.documentElement.setAttribute("data-sidebar-size", "sm");
            }
            if (document.documentElement.getAttribute("data-layout") === "semibox") {
                document.documentElement.setAttribute("data-sidebar-size", "sm");
            }
            if (humberIcon) {
                humberIcon.classList.add("open");
            }
        } else if (windowSize <= 767) {
            document.body.classList.remove("vertical-sidebar-enable");
            if (document.documentElement.getAttribute("data-layout") !== "horizontal") {
                document.documentElement.setAttribute("data-sidebar-size", "lg");
            }
            if (humberIcon) {
                humberIcon.classList.add("open");
            }
        }
    }, [leftsidbarSizeType, sidebarVisibilitytype, layoutType]);


    const permissionControl = (item: any) => {
        return permission.includes(item.permission) || item.permission == "all"
    }

    const roleControl = (item: any) => {
        if (!item.role) {
            if (!item.isChildItem) {
                return true
            }
            return false
        }
        else {
            return item.role == role
        }
    }

    return (
        <React.Fragment>
            {(navData || []).map((item: any, key: any) => {
                return permissionControl(item) ? (
                    <React.Fragment key={key}>
                        {item['isHeader'] ?
                            <li className="menu-title"><span data-key="t-menu">{props.t(item.label)} </span></li>
                            : (
                                (item.subItems ? (
                                    <li className="nav-item">
                                        <Link
                                            onClick={item.click}
                                            className="nav-link menu-link"
                                            to={item.link ? item.link : "/#"}
                                        >
                                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                                                <div>
                                                    {item.icon}
                                                    <span data-key="t-apps">{props.t(item.label)}</span>
                                                </div>
                                                <IoIosArrowDown />
                                            </div>

                                        </Link>
                                        <Collapse
                                            className="menu-dropdown"
                                            isOpen={item.stateVariables}
                                            id="sidebarApps">
                                            <ul className="nav nav-sm flex-column test">
                                                {/* subItms  */}
                                                {item.subItems && ((item.subItems || []).map((subItem: any, key: any) => (
                                                    <React.Fragment key={key}>
                                                        {roleControl(subItem) ? (
                                                            <li className="nav-item">
                                                                <Link
                                                                    to={subItem.link ? subItem.link : "/#"}
                                                                    className="nav-link"
                                                                >
                                                                    {props.t(subItem.label)}
                                                                    {subItem.badgeName ?
                                                                        <span className={"badge badge-pill bg-" + subItem.badgeColor} data-key="t-new">{subItem.badgeName}</span>
                                                                        : null}
                                                                </Link>
                                                            </li>
                                                        ) : null}
                                                    </React.Fragment>
                                                ))
                                                )}
                                            </ul>

                                        </Collapse>
                                    </li>
                                ) : (
                                    <li className="nav-item">
                                        <Link

                                            className="nav-link menu-link"
                                            to={item.link ? item.link : "/#"}>
                                            {item.icon}<span>{props.t(item.label)}</span>

                                        </Link>
                                    </li>
                                ))
                            )
                        }
                    </React.Fragment>
                ) : null


            })}
        </React.Fragment>
    );
};



export default withRouter(withTranslation()(VerticalLayout));