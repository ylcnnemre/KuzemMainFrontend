import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardBody, CardHeader, Col, Container, Row, TabContent, TabPane } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import withRouter from '../../../Components/Common/withRouter';
import { withTranslation } from 'react-i18next';
import ChangePasswordTab from '../../../Components/Profile/ChangePasswordTab';
import ProfileDetail from '../../../Components/Profile/ProfileDetail';
import Experience from '../../../Components/Profile/Experience';
import ProfilePhotoTab from '../../../Components/Profile/ProfilePhotoTab';
import ProfileDetailCardHeader from '../../../Components/Profile/ProfileDetailCardHeader';
import { getUserByIdApi } from '../../../api/User/UserApi';
import useUserStore from '../../../zustand/useUserStore';
import { CircleLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { IUserData } from '../../../api/User/UserType';
import { useNavigate } from 'react-router-dom';


const Settings = ({ t }: any) => {

    const [activeTab, setActiveTab] = useState("1");
    const [userData, setUserData] = useState<IUserData>()
    const { user } = useUserStore()
    const navigate = useNavigate()
    const tabChange = (tab: any) => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    const getUserProfileData = async () => {
        try {
            let response = await getUserByIdApi(user._id)
            console.log("response ==>", response.data)
            setUserData(response.data)
        }
        catch (err: any) {

            console.log("err ==>", err)
            if (err.response.status == 403) {
                navigate("/anasayfa")
            }
            toast.error(err.response.data.message, {
                autoClose: 1000
            })
        }
    }
    useEffect(() => {
        getUserProfileData()
    }, [])


    /* if (!userData) {
        return <CircleLoader />
    } */

    return (
        <React.Fragment>
            <div className="page-content">
                {
                    !userData ? (
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <CircleLoader color="#36d7b7" />
                        </div>
                    ) : (
                        <Container fluid>
                            <BreadCrumb title={"ProfileSettings"} pageTitle="Pages" />
                            <Row>
                                <Col xxl={3} >
                                    <ProfilePhotoTab user={userData} setUser={setUserData} />
                                </Col>
                                <Col xxl={9}>
                                    <Card>
                                        <ProfileDetailCardHeader activeTab={activeTab} tabChange={tabChange} />
                                        <CardBody className="p-4">
                                            <TabContent activeTab={activeTab}>
                                                <TabPane tabId="1">
                                                    <ProfileDetail user={userData} setUser={setUserData} />
                                                </TabPane>
                                                <TabPane tabId="2">
                                                    <ChangePasswordTab />
                                                </TabPane>

                                                <TabPane tabId="3">
                                                    <Experience />
                                                </TabPane>

                                            </TabContent>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    )
                }

            </div>
        </React.Fragment>
    );
};

export default withRouter(withTranslation()(Settings));