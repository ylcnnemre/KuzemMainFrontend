import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from "react-router-dom";
import NonAuthLayout from "../Layouts/NonAuthLayout";
import VerticalLayout from "../Layouts/index";
import { authProtectedRoutes, publicRoutes } from "./allRoutes";
import AuthProtected from './AuthProtected';
import { ToastContainer, toast } from 'react-toastify';
import useUserStore from '../zustand/useUserStore';
import { DotLoader, PropagateLoader } from 'react-spinners';
import { Permission } from '../common/constants/PermissionList';

const Index = () => {

    const { user: { role, permission } } = useUserStore()

    return (
        <React.Suspense fallback={<div style={{ position: "absolute", right: "50%", left: "50%", top: "50%" }} >
            <PropagateLoader color='yellow' />
        </div>}  >
            <ToastContainer />
            <Routes>

                <Route>
                    {publicRoutes.map((route: any, idx: any) => (
                        <Route
                            path={route.path}
                            element={
                                <NonAuthLayout>
                                    {route.component}
                                </NonAuthLayout>
                            }
                            key={idx}
                        // exact={true}
                        />
                    ))}
                </Route>

                <Route>

                    {authProtectedRoutes.map((route, idx: any) => {
                        if (permission.includes(route.permission) || route.permission == Permission.all) {
                            return (
                                <Route
                                    path={route.path}
                                    element={
                                        <AuthProtected>
                                            <VerticalLayout>{route.component}</VerticalLayout>
                                        </AuthProtected>}
                                    key={idx}
                                />
                            )
                        }

                    })}
                </Route>
            </Routes>
        </React.Suspense>
    );
};

export default Index;