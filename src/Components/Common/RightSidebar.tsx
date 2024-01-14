import React, { useEffect, useState } from 'react';
import {
    Offcanvas,
    OffcanvasHeader,
    OffcanvasBody,
    Collapse,
} from "reactstrap";

import withRouter from './withRouter';


//import Constant
import {
    layoutTypes,
    leftSidebarTypes,
    layoutModeTypes,
    layoutWidthTypes,
    layoutPositionTypes,
    topbarThemeTypes,
    leftsidbarSizeTypes,
    leftSidebarViewTypes,
    preloaderTypes,
    backgroundImageTypes,
    sidebarVisibilitytypes
} from "../constants/layout";
import classnames from "classnames";

//SimpleBar
import SimpleBar from "simplebar-react"
import useLayoutStore from '../../zustand/useLayoutStore';

const RightSidebar = (props: any) => {

    const { changeLayout, changeSidebarImageType, changePreLoader, changeLeftsidebarViewType, changeLeftsidebarSizeType, changeLayoutMode, changeLayoutPosition, changeLayoutWidth, changeBackgroundImageType, changeSidebarVisibility, changeTopbarTheme, changeSidebarTheme, preloader, layoutType, layoutModeType, sidebarVisibilitytype, layoutWidthType, layoutPositionType, topbarThemeType, leftsidbarSizeType, leftSidebarViewType, leftSidebarType, backgroundImageType } = useLayoutStore()
    const [show, setShow] = useState(false);
    function tog_show() {
        setShow(!show);
        changeSidebarTheme("gradient")
    }

    useEffect(() => {
        const sidebarColorDark = document.getElementById("sidebar-color-dark") as HTMLInputElement;
        const sidebarColorLight = document.getElementById("sidebar-color-light") as HTMLInputElement;

        if (show && sidebarColorDark && sidebarColorLight) {
            sidebarColorDark.checked = false;
            sidebarColorLight.checked = false;
        }
    }, [show]);



    // open offcanvas
    const [open, setOpen] = useState(true);
    const toggleLeftCanvas = () => {
        setOpen(!open);
    };

    window.onscroll = function () {
        scrollFunction();
    };

    const scrollFunction = () => {
        const element = document.getElementById("back-to-top");
        if (element) {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                element.style.display = "block";
            } else {
                element.style.display = "none";
            }
        }
    };

    const toTop = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };


    const pathName = props.router.location.pathname;

    // useEffect(() => {
    //     const preloader = document.getElementById("preloader");
    //     if (preloader) {
    //         document.getElementById("preloader").style.opacity = "1";
    //         document.getElementById("preloader").style.visibility = "visible";
    //         setTimeout(function () {
    //             document.getElementById("preloader").style.opacity = "0";
    //             document.getElementById("preloader").style.visibility = "hidden";
    //         }, 1000);
    //     }
    // }, [preloader, pathName]);

    useEffect(() => {
        const preloader = document.getElementById("preloader") as HTMLElement;

        if (preloader) {
            preloader.style.opacity = "1";
            preloader.style.visibility = "visible";

            setTimeout(function () {
                preloader.style.opacity = "0";
                preloader.style.visibility = "hidden";
            }, 1000);
        }
    }, [pathName]);

    return (
        <React.Fragment>
            <button
                onClick={() => toTop()}
                className="btn btn-primary btn-icon" id="back-to-top">
                <i className="ri-arrow-up-line"></i>
            </button>

            {preloader === "enable" && <div id="preloader">
                <div id="status">
                    <div className="spinner-border text-primary avatar-sm" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>}

            <div>
                <div className="customizer-setting d-none d-md-block">
                    <div onClick={toggleLeftCanvas} className="btn-primary btn-rounded shadow-lg btn btn-icon btn-lg p-2">
                        <i className='mdi mdi-spin mdi-cog-outline fs-22'></i>
                    </div>
                </div>
                <Offcanvas isOpen={open} toggle={toggleLeftCanvas} direction="end" className="offcanvas-end border-0">
                    <OffcanvasHeader className="d-flex align-items-center bg-primary bg-gradient p-3 offcanvas-header-dark" toggle={toggleLeftCanvas}>
                        <span className="m-0 me-2 text-white">Theme Customizer</span>
                    </OffcanvasHeader>
                    <OffcanvasBody className="p-0">
                        <SimpleBar className="h-100">
                            <div className="p-4">
                                <h6 className="mb-0 fw-semibold text-uppercase">Layout</h6>
                                <p className="text-muted">Choose your layout</p>

                                <div className="row gy-3">
                                    <div className="col-4">
                                        <div className="form-check card-radio">
                                            <input
                                                id="customizer-layout01"
                                                name="data-layout"
                                                type="radio"
                                                value={layoutTypes.VERTICAL}
                                                checked={layoutType === layoutTypes.VERTICAL}
                                                onChange={e => {
                                                    if (e.target.checked) {
                                                        changeLayout(e.target.value)
                                                    }
                                                }}
                                                className="form-check-input"
                                            />
                                            <label className="form-check-label p-0 avatar-md w-100" htmlFor="customizer-layout01">
                                                <span className="d-flex gap-1 h-100">
                                                    <span className="flex-shrink-0">
                                                        <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                            <span className="d-block p-1 px-2 bg-primary-subtle rounded mb-2"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                        </span>
                                                    </span>
                                                    <span className="flex-grow-1">
                                                        <span className="d-flex h-100 flex-column">
                                                            <span className="bg-light d-block p-1"></span>
                                                            <span className="bg-light d-block p-1 mt-auto"></span>
                                                        </span>
                                                    </span>
                                                </span>
                                            </label>
                                        </div>
                                        <h5 className="fs-13 text-center mt-2">Vertical</h5>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-check card-radio">
                                            <input
                                                id="customizer-layout02"
                                                name="data-layout"
                                                type="radio"
                                                value={layoutTypes.HORIZONTAL}
                                                checked={layoutType === layoutTypes.HORIZONTAL}
                                                onChange={e => {
                                                    if (e.target.checked) {
                                                        changeLayout(e.target.value)
                                                    }
                                                }}
                                                className="form-check-input" />
                                            <label className="form-check-label p-0 avatar-md w-100" htmlFor="customizer-layout02">
                                                <span className="d-flex h-100 flex-column gap-1">
                                                    <span className="bg-light d-flex p-1 gap-1 align-items-center">
                                                        <span className="d-block p-1 bg-primary-subtle rounded me-1"></span>
                                                        <span className="d-block p-1 pb-0 px-2 bg-primary-subtle ms-auto"></span>
                                                        <span className="d-block p-1 pb-0 px-2 bg-primary-subtle"></span>
                                                    </span>
                                                    <span className="bg-light d-block p-1"></span>
                                                    <span className="bg-light d-block p-1 mt-auto"></span>
                                                </span>
                                            </label>
                                        </div>
                                        <h5 className="fs-13 text-center mt-2">Horizontal</h5>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-check card-radio">
                                            <input
                                                id="customizer-layout03"
                                                name="data-layout"
                                                type="radio"
                                                value={layoutTypes.TWOCOLUMN}
                                                checked={layoutType === layoutTypes.TWOCOLUMN}
                                                onChange={e => {
                                                    if (e.target.checked) {
                                                        changeLayout(e.target.value)
                                                    }
                                                }}
                                                className="form-check-input" />
                                            <label className="form-check-label p-0 avatar-md w-100" htmlFor="customizer-layout03">
                                                <span className="d-flex gap-1 h-100">
                                                    <span className="flex-shrink-0">
                                                        <span className="bg-light d-flex h-100 flex-column gap-1">
                                                            <span className="d-block p-1 bg-primary-subtle mb-2"></span>
                                                            <span className="d-block p-1 pb-0 bg-primary-subtle"></span>
                                                            <span className="d-block p-1 pb-0 bg-primary-subtle"></span>
                                                            <span className="d-block p-1 pb-0 bg-primary-subtle"></span>
                                                        </span>
                                                    </span>
                                                    <span className="flex-shrink-0">
                                                        <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                            <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                        </span>
                                                    </span>
                                                    <span className="flex-grow-1">
                                                        <span className="d-flex h-100 flex-column">
                                                            <span className="bg-light d-block p-1"></span>
                                                            <span className="bg-light d-block p-1 mt-auto"></span>
                                                        </span>
                                                    </span>
                                                </span>
                                            </label>
                                        </div>
                                        <h5 className="fs-13 text-center mt-2">Two Column</h5>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-check card-radio">
                                            <input id="customizer-layout04" name="data-layout" type="radio" className="form-check-input"
                                                value={layoutTypes.SEMIBOX}
                                                checked={layoutType === layoutTypes.SEMIBOX}
                                                onChange={e => {
                                                    if (e.target.checked) {
                                                        changeLayout(e.target.value)
                                                    }
                                                }}
                                            />
                                            <label className="form-check-label p-0 avatar-md w-100" htmlFor="customizer-layout04">
                                                <span className="d-flex gap-1 h-100">
                                                    <span className="flex-shrink-0 p-1">
                                                        <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                            <span className="d-block p-1 px-2 bg-primary-subtle rounded mb-2"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                        </span>
                                                    </span>
                                                    <span className="flex-grow-1">
                                                        <span className="d-flex h-100 flex-column pt-1 pe-2">
                                                            <span className="bg-light d-block p-1"></span>
                                                            <span className="bg-light d-block p-1 mt-auto"></span>
                                                        </span>
                                                    </span>
                                                </span>
                                            </label>
                                        </div>
                                        <h5 className="fs-13 text-center mt-2">Semi Box</h5>
                                    </div>
                                </div>

                                <h6 className="mt-4 mb-0 fw-semibold text-uppercase">Color Scheme</h6>
                                <p className="text-muted">Choose Light or Dark Scheme.</p>

                                <div className="colorscheme-cardradio">
                                    <div className="row">
                                        <div className="col-4">
                                            <div className="form-check card-radio">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="data-bs-theme"
                                                    id="layout-mode-light"
                                                    value={layoutModeTypes.LIGHTMODE}
                                                    checked={layoutModeType === layoutModeTypes.LIGHTMODE}
                                                    onChange={e => {
                                                        if (e.target.checked) {
                                                            changeLayoutMode(e.target.value)
                                                        }
                                                    }}
                                                />
                                                <label className="form-check-label p-0 avatar-md w-100" htmlFor="layout-mode-light">
                                                    <span className="d-flex gap-1 h-100">
                                                        <span className="flex-shrink-0">
                                                            <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                                <span className="d-block p-1 px-2 bg-primary-subtle rounded mb-2"></span>
                                                                <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                            </span>
                                                        </span>
                                                        <span className="flex-grow-1">
                                                            <span className="d-flex h-100 flex-column">
                                                                <span className="bg-light d-block p-1"></span>
                                                                <span className="bg-light d-block p-1 mt-auto"></span>
                                                            </span>
                                                        </span>
                                                    </span>
                                                </label>
                                            </div>
                                            <h5 className="fs-13 text-center mt-2">Light</h5>
                                        </div>

                                        <div className="col-4">
                                            <div className="form-check card-radio dark">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="data-bs-theme"
                                                    id="layout-mode-dark"
                                                    value={layoutModeTypes.DARKMODE}
                                                    checked={layoutModeType === layoutModeTypes.DARKMODE}
                                                    onChange={e => {
                                                        if (e.target.checked) {
                                                            changeLayoutMode(e.target.value)
                                                        }
                                                    }}
                                                />
                                                <label className="form-check-label p-0 avatar-md w-100 bg-dark" htmlFor="layout-mode-dark">
                                                    <span className="d-flex gap-1 h-100">
                                                        <span className="flex-shrink-0">
                                                            <span className="bg-white bg-opacity-10 d-flex h-100 flex-column gap-1 p-1">
                                                                <span className="d-block p-1 px-2 bg-white bg-opacity-10 rounded mb-2"></span>
                                                                <span className="d-block p-1 px-2 pb-0 bg-white bg-opacity-10"></span>
                                                                <span className="d-block p-1 px-2 pb-0 bg-white bg-opacity-10"></span>
                                                                <span className="d-block p-1 px-2 pb-0 bg-white bg-opacity-10"></span>
                                                            </span>
                                                        </span>
                                                        <span className="flex-grow-1">
                                                            <span className="d-flex h-100 flex-column">
                                                                <span className="bg-white bg-opacity-10 d-block p-1"></span>
                                                                <span className="bg-white bg-opacity-10 d-block p-1 mt-auto"></span>
                                                            </span>
                                                        </span>
                                                    </span>
                                                </label>
                                            </div>
                                            <h5 className="fs-13 text-center mt-2">Dark</h5>
                                        </div>
                                    </div>
                                </div>
                                {layoutType === layoutTypes.SEMIBOX && <div id="sidebar-visibility">
                                    <h6 className="mt-4 mb-0 fw-semibold text-uppercase">Sidebar Visibility</h6>
                                    <p className="text-muted">Choose show or Hidden sidebar.</p>

                                    <div className="row">
                                        <div className="col-4">
                                            <div className="form-check card-radio">
                                                <input className="form-check-input" type="radio" name="data-sidebar-visibility" id="sidebar-visibility-show"
                                                    value={sidebarVisibilitytypes.SHOW}
                                                    checked={sidebarVisibilitytype === sidebarVisibilitytypes.SHOW}
                                                    onChange={e => {
                                                        if (e.target.checked) {
                                                            changeSidebarVisibility(e.target.value)
                                                        }
                                                    }} />
                                                <label className="form-check-label p-0 avatar-md w-100" htmlFor="sidebar-visibility-show">
                                                    <span className="d-flex gap-1 h-100">
                                                        <span className="flex-shrink-0 p-1">
                                                            <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                                <span className="d-block p-1 px-2 bg-primary-subtle rounded mb-2"></span>
                                                                <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                            </span>
                                                        </span>
                                                        <span className="flex-grow-1">
                                                            <span className="d-flex h-100 flex-column pt-1 pe-2">
                                                                <span className="bg-light d-block p-1"></span>
                                                                <span className="bg-light d-block p-1 mt-auto"></span>
                                                            </span>
                                                        </span>
                                                    </span>
                                                </label>
                                            </div>
                                            <h5 className="fs-13 text-center mt-2">Show</h5>
                                        </div>
                                        <div className="col-4">
                                            <div className="form-check card-radio">
                                                <input className="form-check-input" type="radio" name="data-sidebar-visibility" id="sidebar-visibility-hidden"
                                                    value={sidebarVisibilitytypes.HIDDEN}
                                                    checked={sidebarVisibilitytype === sidebarVisibilitytypes.HIDDEN}
                                                    onChange={e => {
                                                        if (e.target.checked) {
                                                            changeSidebarVisibility(e.target.value)
                                                        }
                                                    }}
                                                />
                                                <label className="form-check-label p-0 avatar-md w-100 px-2" htmlFor="sidebar-visibility-hidden">
                                                    <span className="d-flex gap-1 h-100">
                                                        <span className="flex-grow-1">
                                                            <span className="d-flex h-100 flex-column pt-1 px-2">
                                                                <span className="bg-light d-block p-1"></span>
                                                                <span className="bg-light d-block p-1 mt-auto"></span>
                                                            </span>
                                                        </span>
                                                    </span>
                                                </label>
                                            </div>
                                            <h5 className="fs-13 text-center mt-2">Hidden</h5>
                                        </div>
                                    </div>
                                </div>}
                                {layoutType !== layoutTypes.TWOCOLUMN && (
                                    <React.Fragment>
                                        {(layoutType === layoutTypes.VERTICAL || layoutType === layoutTypes.HORIZONTAL) && (<div id="layout-width">
                                            <h6 className="mt-4 mb-0 fw-semibold text-uppercase">Layout Width</h6>
                                            <p className="text-muted">Choose Fluid or Boxed layout.</p>

                                            <div className="row">
                                                <div className="col-4">
                                                    <div className="form-check card-radio">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="data-layout-width"
                                                            id="layout-width-fluid"
                                                            value={layoutWidthTypes.FLUID}
                                                            checked={layoutWidthType === layoutWidthTypes.FLUID}
                                                            onChange={e => {
                                                                if (e.target.checked) {
                                                                    changeLayoutWidth(e.target.value)
                                                                    changeLeftsidebarSizeType("lg")
                                                                }
                                                            }}
                                                        />
                                                        <label className="form-check-label p-0 avatar-md w-100" htmlFor="layout-width-fluid">
                                                            <span className="d-flex gap-1 h-100">
                                                                <span className="flex-shrink-0">
                                                                    <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                                        <span className="d-block p-1 px-2 bg-primary-subtle rounded mb-2"></span>
                                                                        <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                        <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                        <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                    </span>
                                                                </span>
                                                                <span className="flex-grow-1">
                                                                    <span className="d-flex h-100 flex-column">
                                                                        <span className="bg-light d-block p-1"></span>
                                                                        <span className="bg-light d-block p-1 mt-auto"></span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <h5 className="fs-13 text-center mt-2">Fluid</h5>
                                                </div>
                                                <div className="col-4">
                                                    <div className="form-check card-radio">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="data-layout-width"
                                                            id="layout-width-boxed"
                                                            value={layoutWidthTypes.BOXED}
                                                            checked={layoutWidthType === layoutWidthTypes.BOXED}
                                                            onChange={e => {
                                                                if (e.target.checked) {
                                                                    changeLayoutWidth(e.target.value)
                                                                    changeLeftsidebarSizeType("sm-hover")
                                                                }
                                                            }}
                                                        />
                                                        <label className="form-check-label p-0 avatar-md w-100 px-2" htmlFor="layout-width-boxed">
                                                            <span className="d-flex gap-1 h-100 border-start border-end">
                                                                <span className="flex-shrink-0">
                                                                    <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                                        <span className="d-block p-1 px-2 bg-primary-subtle rounded mb-2"></span>
                                                                        <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                        <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                        <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                    </span>
                                                                </span>
                                                                <span className="flex-grow-1">
                                                                    <span className="d-flex h-100 flex-column">
                                                                        <span className="bg-light d-block p-1"></span>
                                                                        <span className="bg-light d-block p-1 mt-auto"></span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <h5 className="fs-13 text-center mt-2">Boxed</h5>
                                                </div>
                                            </div>
                                        </div>)}

                                        <div id="layout-position">
                                            <h6 className="mt-4 mb-0 fw-semibold text-uppercase">Layout Position</h6>
                                            <p className="text-muted">Choose Fixed or Scrollable Layout Position.</p>

                                            <div className="btn-group radio" role="group">
                                                <input
                                                    type="radio"
                                                    className="btn-check"
                                                    name="data-layout-position"
                                                    id="layout-position-fixed"
                                                    value={layoutPositionTypes.FIXED}
                                                    checked={layoutPositionType === layoutPositionTypes.FIXED}
                                                    onChange={e => {
                                                        if (e.target.checked) {
                                                            changeLayoutPosition(e.target.value)
                                                        }
                                                    }}
                                                />
                                                <label className="btn btn-light w-sm" htmlFor="layout-position-fixed">Fixed</label>

                                                <input
                                                    type="radio"
                                                    className="btn-check"
                                                    name="data-layout-position"
                                                    id="layout-position-scrollable"
                                                    value={layoutPositionTypes.SCROLLABLE}
                                                    checked={layoutPositionType === layoutPositionTypes.SCROLLABLE}
                                                    onChange={e => {
                                                        if (e.target.checked) {
                                                            changeLayoutPosition(e.target.value)
                                                        }
                                                    }}
                                                />
                                                <label className="btn btn-light w-sm ms-0" htmlFor="layout-position-scrollable">Scrollable</label>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )}

                                <h6 className="mt-4 mb-0 fw-semibold text-uppercase">Topbar Color</h6>
                                <p className="text-muted">Choose Light or Dark Topbar Color.</p>

                                <div className="row">
                                    <div className="col-4">
                                        <div className="form-check card-radio">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="data-topbar"
                                                id="topbar-color-light"
                                                value={topbarThemeTypes.LIGHT}
                                                checked={topbarThemeType === topbarThemeTypes.LIGHT}
                                                onChange={e => {
                                                    if (e.target.checked) {
                                                        changeTopbarTheme(e.target.value)
                                                    }
                                                }}
                                            />
                                            <label className="form-check-label p-0 avatar-md w-100" htmlFor="topbar-color-light">
                                                <span className="d-flex gap-1 h-100">
                                                    <span className="flex-shrink-0">
                                                        <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                            <span className="d-block p-1 px-2 bg-primary-subtle rounded mb-2"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                        </span>
                                                    </span>
                                                    <span className="flex-grow-1">
                                                        <span className="d-flex h-100 flex-column">
                                                            <span className="bg-light d-block p-1"></span>
                                                            <span className="bg-light d-block p-1 mt-auto"></span>
                                                        </span>
                                                    </span>
                                                </span>
                                            </label>
                                        </div>
                                        <h5 className="fs-13 text-center mt-2">Light</h5>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-check card-radio">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="data-topbar"
                                                id="topbar-color-dark"
                                                value={topbarThemeTypes.DARK}
                                                checked={topbarThemeType === topbarThemeTypes.DARK}
                                                onChange={e => {
                                                    if (e.target.checked) {
                                                        changeTopbarTheme(e.target.value)
                                                    }
                                                }}
                                            />
                                            <label className="form-check-label p-0 avatar-md w-100" htmlFor="topbar-color-dark">
                                                <span className="d-flex gap-1 h-100">
                                                    <span className="flex-shrink-0">
                                                        <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                            <span className="d-block p-1 px-2 bg-primary-subtle rounded mb-2"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                            <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                        </span>
                                                    </span>
                                                    <span className="flex-grow-1">
                                                        <span className="d-flex h-100 flex-column">
                                                            <span className="bg-primary d-block p-1"></span>
                                                            <span className="bg-light d-block p-1 mt-auto"></span>
                                                        </span>
                                                    </span>
                                                </span>
                                            </label>
                                        </div>
                                        <h5 className="fs-13 text-center mt-2">Dark</h5>
                                    </div>
                                </div>

                                {(layoutType === "vertical" || (layoutType === "semibox" && sidebarVisibilitytype === "show")) && (
                                    <React.Fragment>

                                        <div id="sidebar-size">
                                            <h6 className="mt-4 mb-0 fw-semibold text-uppercase">Sidebar Size</h6>
                                            <p className="text-muted">Choose a size of Sidebar.</p>

                                            <div className="row">
                                                <div className="col-4">
                                                    <div className="form-check sidebar-setting card-radio">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="data-sidebar-size"
                                                            id="sidebar-size-default"
                                                            value={leftsidbarSizeTypes.DEFAULT}
                                                            checked={leftsidbarSizeType === leftsidbarSizeTypes.DEFAULT}
                                                            onChange={e => {
                                                                if (e.target.checked) {
                                                                    changeLeftsidebarSizeType(e.target.value)
                                                                }
                                                            }}
                                                        />
                                                        <label className="form-check-label p-0 avatar-md w-100" htmlFor="sidebar-size-default">
                                                            <span className="d-flex gap-1 h-100">
                                                                <span className="flex-shrink-0">
                                                                    <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                                        <span className="d-block p-1 px-2 bg-primary-subtle rounded mb-2"></span>
                                                                        <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                        <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                        <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                    </span>
                                                                </span>
                                                                <span className="flex-grow-1">
                                                                    <span className="d-flex h-100 flex-column">
                                                                        <span className="bg-light d-block p-1"></span>
                                                                        <span className="bg-light d-block p-1 mt-auto"></span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <h5 className="fs-13 text-center mt-2">Default</h5>
                                                </div>

                                                <div className="col-4">
                                                    <div className="form-check sidebar-setting card-radio">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="data-sidebar-size"
                                                            id="sidebar-size-compact"
                                                            value={leftsidbarSizeTypes.COMPACT}
                                                            checked={leftsidbarSizeType === leftsidbarSizeTypes.COMPACT}
                                                            onChange={e => {
                                                                if (e.target.checked) {
                                                                    changeLeftsidebarSizeType(e.target.value)
                                                                }
                                                            }}
                                                        />
                                                        <label className="form-check-label p-0 avatar-md w-100" htmlFor="sidebar-size-compact">
                                                            <span className="d-flex gap-1 h-100">
                                                                <span className="flex-shrink-0">
                                                                    <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                                        <span className="d-block p-1 bg-primary-subtle rounded mb-2"></span>
                                                                        <span className="d-block p-1 pb-0 bg-primary-subtle"></span>
                                                                        <span className="d-block p-1 pb-0 bg-primary-subtle"></span>
                                                                        <span className="d-block p-1 pb-0 bg-primary-subtle"></span>
                                                                    </span>
                                                                </span>
                                                                <span className="flex-grow-1">
                                                                    <span className="d-flex h-100 flex-column">
                                                                        <span className="bg-light d-block p-1"></span>
                                                                        <span className="bg-light d-block p-1 mt-auto"></span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <h5 className="fs-13 text-center mt-2">Compact</h5>
                                                </div>

                                                <div className="col-4">
                                                    <div className="form-check sidebar-setting card-radio">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="data-sidebar-size"
                                                            id="sidebar-size-small"
                                                            value={leftsidbarSizeTypes.SMALLICON}
                                                            checked={leftsidbarSizeType === leftsidbarSizeTypes.SMALLICON}
                                                            onChange={e => {
                                                                if (e.target.checked)
                                                                    changeLeftsidebarSizeType(e.target.value)
                                                            }
                                                            }
                                                        />
                                                        <label className="form-check-label p-0 avatar-md w-100" htmlFor="sidebar-size-small">
                                                            <span className="d-flex gap-1 h-100">
                                                                <span className="flex-shrink-0">
                                                                    <span className="bg-light d-flex h-100 flex-column gap-1">
                                                                        <span className="d-block p-1 bg-primary-subtle mb-2"></span>
                                                                        <span className="d-block p-1 pb-0 bg-primary-subtle"></span>
                                                                        <span className="d-block p-1 pb-0 bg-primary-subtle"></span>
                                                                        <span className="d-block p-1 pb-0 bg-primary-subtle"></span>
                                                                    </span>
                                                                </span>
                                                                <span className="flex-grow-1">
                                                                    <span className="d-flex h-100 flex-column">
                                                                        <span className="bg-light d-block p-1"></span>
                                                                        <span className="bg-light d-block p-1 mt-auto"></span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <h5 className="fs-13 text-center mt-2">Small (Icon View)</h5>
                                                </div>

                                                <div className="col-4">
                                                    <div className="form-check sidebar-setting card-radio">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="data-sidebar-size"
                                                            id="sidebar-size-small-hover"
                                                            value={leftsidbarSizeTypes.SMALLHOVER}
                                                            checked={leftsidbarSizeType === leftsidbarSizeTypes.SMALLHOVER}
                                                            onChange={e => {
                                                                if (e.target.checked) {
                                                                    changeLeftsidebarSizeType(e.target.value)
                                                                }
                                                            }}

                                                        />
                                                        <label className="form-check-label p-0 avatar-md w-100" htmlFor="sidebar-size-small-hover">
                                                            <span className="d-flex gap-1 h-100">
                                                                <span className="flex-shrink-0">
                                                                    <span className="bg-light d-flex h-100 flex-column gap-1">
                                                                        <span className="d-block p-1 bg-primary-subtle mb-2"></span>
                                                                        <span className="d-block p-1 pb-0 bg-primary-subtle"></span>
                                                                        <span className="d-block p-1 pb-0 bg-primary-subtle"></span>
                                                                        <span className="d-block p-1 pb-0 bg-primary-subtle"></span>
                                                                    </span>
                                                                </span>
                                                                <span className="flex-grow-1">
                                                                    <span className="d-flex h-100 flex-column">
                                                                        <span className="bg-light d-block p-1"></span>
                                                                        <span className="bg-light d-block p-1 mt-auto"></span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <h5 className="fs-13 text-center mt-2">Small Hover View</h5>
                                                </div>
                                            </div>
                                        </div>

                                        <div id="sidebar-view">
                                            <h6 className="mt-4 mb-0 fw-semibold text-uppercase">Sidebar View</h6>
                                            <p className="text-muted">Choose Default or Detached Sidebar view.</p>

                                            <div className="row">
                                                <div className="col-4">
                                                    <div className="form-check sidebar-setting card-radio">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="data-layout-style"
                                                            id="sidebar-view-default"
                                                            value={leftSidebarViewTypes.DEFAULT}
                                                            checked={leftSidebarViewType === leftSidebarViewTypes.DEFAULT}
                                                            onChange={e => {
                                                                if (e.target.checked) {
                                                                    changeLeftsidebarViewType(e.target.value)
                                                                }
                                                            }}

                                                        />
                                                        <label className="form-check-label p-0 avatar-md w-100" htmlFor="sidebar-view-default">
                                                            <span className="d-flex gap-1 h-100">
                                                                <span className="flex-shrink-0">
                                                                    <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                                        <span className="d-block p-1 px-2 bg-primary-subtle rounded mb-2"></span>
                                                                        <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                        <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                        <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                    </span>
                                                                </span>
                                                                <span className="flex-grow-1">
                                                                    <span className="d-flex h-100 flex-column">
                                                                        <span className="bg-light d-block p-1"></span>
                                                                        <span className="bg-light d-block p-1 mt-auto"></span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <h5 className="fs-13 text-center mt-2">Default</h5>
                                                </div>
                                                <div className="col-4">
                                                    <div className="form-check sidebar-setting card-radio">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="data-layout-style"
                                                            id="sidebar-view-detached"
                                                            value={leftSidebarViewTypes.DETACHED}
                                                            checked={leftSidebarViewType === leftSidebarViewTypes.DETACHED}
                                                            onChange={e => {
                                                                if (e.target.checked) {
                                                                    changeLeftsidebarViewType(e.target.value)
                                                                }
                                                            }}
                                                        />
                                                        <label className="form-check-label p-0 avatar-md w-100" htmlFor="sidebar-view-detached">
                                                            <span className="d-flex h-100 flex-column">
                                                                <span className="bg-light d-flex p-1 gap-1 align-items-center px-2">
                                                                    <span className="d-block p-1 bg-primary-subtle rounded me-1"></span>
                                                                    <span className="d-block p-1 pb-0 px-2 bg-primary-subtle ms-auto"></span>
                                                                    <span className="d-block p-1 pb-0 px-2 bg-primary-subtle"></span>
                                                                </span>
                                                                <span className="d-flex gap-1 h-100 p-1 px-2">
                                                                    <span className="flex-shrink-0">
                                                                        <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                                            <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                            <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                            <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                        </span>
                                                                    </span>
                                                                </span>
                                                                <span className="bg-light d-block p-1 mt-auto px-2"></span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <h5 className="fs-13 text-center mt-2">Detached</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )}

                                {(layoutType === "vertical" || layoutType === "twocolumn" || (layoutType === "semibox" && sidebarVisibilitytype === "show")) && (
                                    <React.Fragment>
                                        <div id="sidebar-color">
                                            <h6 className="mt-4 mb-0 fw-semibold text-uppercase">Sidebar Color</h6>
                                            <p className="text-muted">Choose Ligth or Dark Sidebar Color.</p>

                                            <div className="row">
                                                <div className="col-4">
                                                    <div className="form-check sidebar-setting card-radio">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="data-sidebar"
                                                            id="sidebar-color-light"
                                                            value={leftSidebarTypes.LIGHT}
                                                            checked={leftSidebarType === leftSidebarTypes.LIGHT}
                                                            onChange={e => {
                                                                setShow(false);
                                                                if (e.target.checked) {
                                                                    changeSidebarTheme(e.target.value)
                                                                }
                                                            }}
                                                        />
                                                        <label className="form-check-label p-0 avatar-md w-100" htmlFor="sidebar-color-light">
                                                            <span className="d-flex gap-1 h-100">
                                                                <span className="flex-shrink-0">
                                                                    <span className="bg-white border-end d-flex h-100 flex-column gap-1 p-1">
                                                                        <span className="d-block p-1 px-2 bg-primary-subtle rounded mb-2"></span>
                                                                        <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                        <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                        <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                    </span>
                                                                </span>
                                                                <span className="flex-grow-1">
                                                                    <span className="d-flex h-100 flex-column">
                                                                        <span className="bg-light d-block p-1"></span>
                                                                        <span className="bg-light d-block p-1 mt-auto"></span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <h5 className="fs-13 text-center mt-2">Light</h5>
                                                </div>
                                                <div className="col-4">
                                                    <div className="form-check sidebar-setting card-radio">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="data-sidebar"
                                                            id="sidebar-color-dark"
                                                            value={leftSidebarTypes.DARK}
                                                            checked={leftSidebarType === leftSidebarTypes.DARK}
                                                            onChange={e => {
                                                                setShow(false);
                                                                if (e.target.checked) {
                                                                    changeSidebarTheme(e.target.value)
                                                                }
                                                            }}
                                                        />
                                                        <label className="form-check-label p-0 avatar-md w-100" htmlFor="sidebar-color-dark">
                                                            <span className="d-flex gap-1 h-100">
                                                                <span className="flex-shrink-0">
                                                                    <span className="bg-primary d-flex h-100 flex-column gap-1 p-1">
                                                                        <span className="d-block p-1 px-2 bg-white bg-opacity-10 rounded mb-2"></span>
                                                                        <span className="d-block p-1 px-2 pb-0 bg-white bg-opacity-10"></span>
                                                                        <span className="d-block p-1 px-2 pb-0 bg-white bg-opacity-10"></span>
                                                                        <span className="d-block p-1 px-2 pb-0 bg-white bg-opacity-10"></span>
                                                                    </span>
                                                                </span>
                                                                <span className="flex-grow-1">
                                                                    <span className="d-flex h-100 flex-column">
                                                                        <span className="bg-light d-block p-1"></span>
                                                                        <span className="bg-light d-block p-1 mt-auto"></span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <h5 className="fs-13 text-center mt-2">Dark</h5>
                                                </div>
                                                <div className="col-4">
                                                    <button
                                                        className={classnames(
                                                            "btn btn-link avatar-md w-100 p-0 overflow-hidden border ",
                                                            { collapsed: !show, active: show === true }
                                                        )}
                                                        type="button"
                                                        data-bs-target="#collapseBgGradient"
                                                        data-bs-toggle="collapse"
                                                        aria-controls="collapseBgGradient"
                                                        // checked={leftSidebarType === leftSidebarTypes.GRAD}
                                                        onClick={tog_show}
                                                    >
                                                        <span className="d-flex gap-1 h-100">
                                                            <span className="flex-shrink-0">
                                                                <span className="bg-vertical-gradient d-flex h-100 flex-column gap-1 p-1">
                                                                    <span className="d-block p-1 px-2 bg-white bg-opacity-10 rounded mb-2"></span>
                                                                    <span className="d-block p-1 px-2 pb-0 bg-white bg-opacity-10"></span>
                                                                    <span className="d-block p-1 px-2 pb-0 bg-white bg-opacity-10"></span>
                                                                    <span className="d-block p-1 px-2 pb-0 bg-white bg-opacity-10"></span>
                                                                </span>
                                                            </span>
                                                            <span className="flex-grow-1">
                                                                <span className="d-flex h-100 flex-column">
                                                                    <span className="bg-light d-block p-1"></span>
                                                                    <span className="bg-light d-block p-1 mt-auto"></span>
                                                                </span>
                                                            </span>
                                                        </span>
                                                    </button>
                                                    <h5 className="fs-13 text-center mt-2">Gradient</h5>
                                                </div>
                                            </div>
                                            <Collapse
                                                isOpen={show}
                                                className="collapse"
                                                id="collapseBgGradient"
                                            >
                                                <div className="d-flex gap-2 flex-wrap img-switch p-2 px-3 bg-light rounded">
                                                    <div className="form-check sidebar-setting card-radio">
                                                        <input className="form-check-input"
                                                            type="radio"
                                                            name="data-sidebar"
                                                            id="sidebar-color-gradient"
                                                            value={leftSidebarTypes.GRADIENT}
                                                            checked={leftSidebarType === leftSidebarTypes.GRADIENT}
                                                            onChange={e => {
                                                                if (e.target.checked) {
                                                                    changeSidebarTheme(e.target.value)
                                                                }
                                                            }}
                                                        />
                                                        <label className="form-check-label p-0 avatar-xs rounded-circle" htmlFor="sidebar-color-gradient">
                                                            <span className="avatar-title rounded-circle bg-vertical-gradient"></span>
                                                        </label>
                                                    </div>
                                                    <div className="form-check sidebar-setting card-radio">
                                                        <input className="form-check-input"
                                                            type="radio"
                                                            name="data-sidebar"
                                                            id="sidebar-color-gradient-2"
                                                            value={leftSidebarTypes.GRADIENT_2}
                                                            checked={leftSidebarType === leftSidebarTypes.GRADIENT_2}
                                                            onChange={e => {
                                                                if (e.target.checked) {
                                                                    changeSidebarTheme(e.target.value)
                                                                }
                                                            }}
                                                        />
                                                        <label className="form-check-label p-0 avatar-xs rounded-circle" htmlFor="sidebar-color-gradient-2">
                                                            <span className="avatar-title rounded-circle bg-vertical-gradient-2"></span>
                                                        </label>
                                                    </div>
                                                    <div className="form-check sidebar-setting card-radio">
                                                        <input className="form-check-input"
                                                            type="radio"
                                                            name="data-sidebar"
                                                            id="sidebar-color-gradient-3"
                                                            value={leftSidebarTypes.GRADIENT_3}
                                                            checked={leftSidebarType === leftSidebarTypes.GRADIENT_3}
                                                            onChange={e => {
                                                                if (e.target.checked) {
                                                                    changeSidebarTheme(e.target.value)
                                                                }
                                                            }}
                                                        />
                                                        <label className="form-check-label p-0 avatar-xs rounded-circle" htmlFor="sidebar-color-gradient-3">
                                                            <span className="avatar-title rounded-circle bg-vertical-gradient-3"></span>
                                                        </label>
                                                    </div>
                                                    <div className="form-check sidebar-setting card-radio">
                                                        <input className="form-check-input"
                                                            type="radio"
                                                            name="data-sidebar"
                                                            id="sidebar-color-gradient-4"
                                                            value={leftSidebarTypes.GRADIENT_4}
                                                            checked={leftSidebarType === leftSidebarTypes.GRADIENT_4}
                                                            onChange={e => {
                                                                if (e.target.checked) {
                                                                    changeSidebarTheme(e.target.value)
                                                                }
                                                            }}
                                                        />
                                                        <label className="form-check-label p-0 avatar-xs rounded-circle" htmlFor="sidebar-color-gradient-4">
                                                            <span className="avatar-title rounded-circle bg-vertical-gradient-4"></span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </Collapse>
                                        </div>
                                    </React.Fragment>
                                )}

                                <div id="preloader-menu">
                                    <h6 className="mt-4 mb-0 fw-semibold text-uppercase">Preloader</h6>
                                    <p className="text-muted">Choose a preloader.</p>

                                    <div className="row">
                                        <div className="col-4">
                                            <div className="form-check sidebar-setting card-radio">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="data-preloader"
                                                    id="preloader-view-custom"
                                                    value={preloaderTypes.ENABLE}
                                                    checked={preloader === preloaderTypes.ENABLE}
                                                    onChange={e => {
                                                        if (e.target.checked) {
                                                            changePreLoader(e.target.value)
                                                        }
                                                    }}
                                                />

                                                <label className="form-check-label p-0 avatar-md w-100" htmlFor="preloader-view-custom">
                                                    <span className="d-flex gap-1 h-100">
                                                        <span className="flex-shrink-0">
                                                            <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                                <span className="d-block p-1 px-2 bg-primary-subtle rounded mb-2"></span>
                                                                <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                            </span>
                                                        </span>
                                                        <span className="flex-grow-1">
                                                            <span className="d-flex h-100 flex-column">
                                                                <span className="bg-light d-block p-1"></span>
                                                                <span className="bg-light d-block p-1 mt-auto"></span>
                                                            </span>
                                                        </span>
                                                    </span>

                                                    <div id="status" className="d-flex align-items-center justify-content-center">
                                                        <div className="spinner-border text-primary avatar-xxs m-auto" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                    </div>

                                                </label>
                                            </div>
                                            <h5 className="fs-13 text-center mt-2">Enable</h5>
                                        </div>
                                        <div className="col-4">
                                            <div className="form-check sidebar-setting card-radio">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="data-preloader"
                                                    id="preloader-view-none"
                                                    value={preloaderTypes.DISABLE}
                                                    checked={preloader === preloaderTypes.DISABLE}
                                                    onChange={e => {
                                                        if (e.target.checked) {
                                                            changePreLoader(e.target.value)
                                                        }
                                                    }}
                                                />
                                                <label className="form-check-label p-0 avatar-md w-100" htmlFor="preloader-view-none">
                                                    <span className="d-flex gap-1 h-100">
                                                        <span className="flex-shrink-0">
                                                            <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                                <span className="d-block p-1 px-2 bg-primary-subtle rounded mb-2"></span>
                                                                <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                            </span>
                                                        </span>
                                                        <span className="flex-grow-1">
                                                            <span className="d-flex h-100 flex-column">
                                                                <span className="bg-light d-block p-1"></span>
                                                                <span className="bg-light d-block p-1 mt-auto"></span>
                                                            </span>
                                                        </span>
                                                    </span>
                                                </label>
                                            </div>
                                            <h5 className="fs-13 text-center mt-2">Disable</h5>
                                        </div>
                                    </div>
                                </div>
                                <div id="body-img">
                                    <h6 className="mt-4 mb-0 fw-semibold text-uppercase">Background Image</h6>
                                    <p className="text-muted">Choose a body background image.</p>

                                    <div className="row">
                                        <div className="col-4">
                                            <div className="form-check sidebar-setting card-radio">
                                                <input className="form-check-input" type="radio" name="data-body-image" id="body-img-none"
                                                    value={backgroundImageTypes.NONE}
                                                    checked={backgroundImageType === backgroundImageTypes.NONE}
                                                    onChange={e => {
                                                        if (e.target.checked) {
                                                            changeBackgroundImageType(e.target.value)
                                                        }
                                                    }}
                                                />
                                                <label className="form-check-label p-0 avatar-md w-100" data-body-image="none" htmlFor="body-img-none">
                                                    <span className="d-flex gap-1 h-100">
                                                        <span className="flex-shrink-0">
                                                            <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                                <span className="d-block p-1 px-2 bg-primary-subtle rounded mb-2"></span>
                                                                <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                                <span className="d-block p-1 px-2 pb-0 bg-primary-subtle"></span>
                                                            </span>
                                                        </span>
                                                        <span className="flex-grow-1">
                                                            <span className="d-flex h-100 flex-column">
                                                                <span className="bg-light d-block p-1"></span>
                                                                <span className="bg-light d-block p-1 mt-auto"></span>
                                                            </span>
                                                        </span>
                                                    </span>
                                                </label>
                                            </div>
                                            <h5 className="fs-13 text-center mt-2">None</h5>
                                        </div>

                                        <div className="col-4">
                                            <div className="form-check sidebar-setting card-radio">
                                                <input className="form-check-input" type="radio" name="data-body-image" id="body-img-one"
                                                    value={backgroundImageTypes.IMG1}
                                                    checked={backgroundImageType === backgroundImageTypes.IMG1}
                                                    onChange={e => {
                                                        if (e.target.checked) {
                                                            changeBackgroundImageType(e.target.value)
                                                        }
                                                    }}
                                                />
                                                <label className="form-check-label p-0 avatar-md w-100" data-body-image="img-1" htmlFor="body-img-one">
                                                </label>
                                            </div>
                                            <h5 className="fs-13 text-center mt-2">One</h5>
                                        </div>


                                        <div className="col-4">
                                            <div className="form-check sidebar-setting card-radio">
                                                <input className="form-check-input" type="radio" name="data-body-image" id="body-img-two"
                                                    value={backgroundImageTypes.IMG2}
                                                    checked={backgroundImageType === backgroundImageTypes.IMG2}
                                                    onChange={e => {
                                                        if (e.target.checked) {
                                                            changeBackgroundImageType(e.target.value)
                                                        }
                                                    }}
                                                />
                                                <label className="form-check-label p-0 avatar-md w-100" data-body-image="img-2" htmlFor="body-img-two">
                                                </label>
                                            </div>
                                            <h5 className="fs-13 text-center mt-2">Two</h5>
                                        </div>


                                        <div className="col-4">
                                            <div className="form-check sidebar-setting card-radio">
                                                <input className="form-check-input" type="radio" name="data-body-image" id="body-img-three"
                                                    value={backgroundImageTypes.IMG3}
                                                    checked={backgroundImageType === backgroundImageTypes.IMG3}
                                                    onChange={e => {
                                                        if (e.target.checked) {
                                                            changeBackgroundImageType(e.target.value)
                                                        }
                                                    }}
                                                />
                                                <label className="form-check-label p-0 avatar-md w-100" data-body-image="img-3" htmlFor="body-img-three">
                                                </label>
                                            </div>
                                            <h5 className="fs-13 text-center mt-2">Three</h5>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </SimpleBar>

                    </OffcanvasBody>

                </Offcanvas>
            </div>
        </React.Fragment>
    );
};

export default withRouter(RightSidebar);
