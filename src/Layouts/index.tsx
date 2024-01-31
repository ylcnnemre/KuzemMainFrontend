import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import withRouter from '../Components/Common/withRouter';

//import Components
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import RightSidebar from '../Components/Common/RightSidebar';


import useLayoutStore from '../zustand/useLayoutStore';


const Layout = (props: any) => {
    const [headerClass, setHeaderClass] = useState("");

    const {
        layoutType,
        leftSidebarType,
        layoutModeType,
        layoutWidthType,
        layoutPositionType,
        topbarThemeType,
        leftsidbarSizeType,
        leftSidebarViewType,
        backgroundImageType,
        sidebarVisibilitytype,
        changeLeftsidebarViewType,
        changeLeftsidebarSizeType,
        changeSidebarTheme,
        changeLayoutMode,
        changeLayoutWidth,
        changeTopbarTheme,
        changeLayoutPosition,
        changeLayout,
        changeBackgroundImageType,
        changeSidebarVisibility
    } = useLayoutStore()


    useEffect(() => {
        window.dispatchEvent(new Event('resize'));
        changeLeftsidebarViewType(leftSidebarViewType)
        changeLeftsidebarSizeType(leftsidbarSizeType)
        changeSidebarTheme(leftSidebarType)
        changeLayoutMode(layoutModeType)
        changeLayoutWidth(layoutWidthType)
        changeLayoutPosition(layoutPositionType)
        changeTopbarTheme(topbarThemeType)
        changeLayout(layoutType)
        changeBackgroundImageType(backgroundImageType)
        changeSidebarVisibility(sidebarVisibilitytype)

    }, [layoutType,
        leftSidebarType,
        layoutModeType,
        layoutWidthType,
        layoutPositionType,
        topbarThemeType,
        leftsidbarSizeType,
        leftSidebarViewType,
        backgroundImageType,
        sidebarVisibilitytype,
    ]);
    /*
    call dark/light mode
    */
    const onChangeLayoutMode = (value: any) => {
        if (changeLayoutMode) {
            changeLayoutMode(value)
        }
    };

    // class add remove in header 
    useEffect(() => {
        window.addEventListener("scroll", scrollNavigation, true);
    });

    function scrollNavigation() {
        var scrollup = document.documentElement.scrollTop;
        if (scrollup > 50) {
            setHeaderClass("topbar-shadow");
        } else {
            setHeaderClass("");
        }
    }

    useEffect(() => {
        const humberIcon = document.querySelector(".hamburger-icon") as HTMLElement;
        if (sidebarVisibilitytype === 'show' || layoutType === "vertical" || layoutType === "twocolumn") {
            humberIcon.classList.remove('open');
        } else {
            humberIcon && humberIcon.classList.add('open');
        }
    }, [sidebarVisibilitytype, layoutType]);

    return (
        <React.Fragment>
            <div id="layout-wrapper">
                <Header
                    headerClass={headerClass}
                    layoutModeType={layoutModeType}
                    onChangeLayoutMode={onChangeLayoutMode} />
                <Sidebar
                    layoutType={layoutType}
                />
                <div className="main-content">{props.children}
                    <Footer />
                </div>
            </div>
{/*             <RightSidebar /> */}
        </React.Fragment>

    );
};



export default withRouter(Layout);