import classNames from 'classnames';
import React, { useEffect, useState } from 'react'
import { Card, Col, Nav, NavItem, Row, NavLink } from 'reactstrap';
import SemesterTable from './SemesterTable';
import CustomLoader from '../Loading/CustomLoader';
import { getAllSemesterApi } from '../../api/Semester/SemesterApi';
import { ISemester } from '../../api/Semester/SemesterType';
import { toast } from 'react-toastify';

const SemesterDashboard = () => {
    const [activeTab, setActiveTab] = useState<any>("1");
    const [loading, setLoading] = useState<boolean>(false)
    const [semesterData, setSemesterData] = useState<ISemester[]>([])
    const toggleTab = (tab: any) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

    const getAllSemester = async () => {
        try {
            setLoading(true)
            const response = await getAllSemesterApi()
            setSemesterData(response.data)
        }
        catch (err: any) {
            toast.error(err.message, {
                autoClose: 1000
            })
        }
        finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        getAllSemester()
    }, [])

    if (loading) {
        return <CustomLoader />
    }

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
                                            Dönemler{" "}
                                            <span className="badge bg-danger-subtle text-danger align-middle rounded-pill ms-1">
                                                {semesterData.length}
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
                                <SemesterTable data={semesterData} setSemesterData={setSemesterData} />
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

export default SemesterDashboard