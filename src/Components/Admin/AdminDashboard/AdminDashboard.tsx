import React, { useEffect, useState } from 'react'
import { IUserData } from '../../../api/User/UserType';
import { Card, Col, Nav, NavItem, NavLink, Row } from 'reactstrap';
import classNames from 'classnames';
import AdminTable from './AdminTable';
import { getAdminListApi } from '../../../api/User/UserApi';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState<any>("1");
    const [adminList, setAdminList] = useState<IUserData[]>([])
    const toggleTab = (tab: any) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

    const getAdminList = async () => {
        try {
            const response = await getAdminListApi()
            setAdminList(response.data)
        }
        catch (err: any) {
            toast.error(err.message, {
                autoClose: 1000
            })
        }
    }


    useEffect(() => {
        getAdminList()
    }, [])


    return (
        <Row>
            <Col lg={12}>
                <Card>
                    <div className="card-header border-0">
                        <Row className=" align-items-center">
                            <Col>
                                <Nav
                                    className="nav-tabs-custom card-header-tabs border-bottom-0"
                                    role="tablist"
                                >
                                    <NavItem>
                                        <NavLink
                                            className={classNames(
                                                { active: activeTab === "1" },
                                                "fw-semibold"
                                            )}
                                            onClick={() => {
                                                toggleTab("1");
                                            }}
                                            href='#'
                                        >
                                            All{" "}
                                            <span className="badge bg-danger-subtle text-danger align-middle rounded-pill ms-1">
                                                12
                                            </span>
                                        </NavLink>

                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classNames(
                                                { active: activeTab === "2" },
                                                "fw-semibold"
                                            )}
                                            onClick={() => {
                                                toggleTab("2");
                                            }}
                                            href="#"
                                        >
                                            Test{" "}
                                            <span className="badge bg-danger-subtle text-danger align-middle rounded-pill ms-1">
                                                12
                                            </span>
                                        </NavLink>

                                    </NavItem>

                                </Nav>
                            </Col>
                        </Row>
                    </div>
                    <div className="card-body pt-0">
                        {
                            activeTab == "1" && (
                                <AdminTable adminData={adminList} />
                            )
                        }
                        {
                            activeTab == "2" && (
                                <h3>
                                    asdad
                                </h3>
                            )
                        }
                    </div>


                </Card>

            </Col>

        </Row>
    )
}

export default AdminDashboard