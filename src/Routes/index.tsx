import React from 'react';
import { Routes, Route } from "react-router-dom";

//Layouts
import NonAuthLayout from "../Layouts/NonAuthLayout";
import VerticalLayout from "../Layouts/index";

//routes
import { authProtectedRoutes, publicRoutes } from "./allRoutes";
import AuthProtected from './AuthProtected';
import { ToastContainer } from 'react-toastify';
import useUserStore from '../zustand/useUserStore';

const Index = () => {

    const { user: { role } } = useUserStore()

    return (
        <React.Fragment>
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
                        return route.role.includes(role) && (
                            <Route
                                path={route.path}
                                element={
                                    <AuthProtected>
                                        <VerticalLayout>{route.component}</VerticalLayout>
                                    </AuthProtected>}
                                key={idx}
                            // exact={true}
                            />
                        )
                    })}
                </Route>
            </Routes>
        </React.Fragment>
    );
};

export default Index;