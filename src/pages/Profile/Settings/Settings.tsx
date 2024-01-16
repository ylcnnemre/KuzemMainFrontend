import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Col, Container, Form, Input, Label, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import classnames from "classnames";

import withRouter from '../../../Components/Common/withRouter';
import { withTranslation } from 'react-i18next';
import ChangePasswordTab from './ChangePasswordTab';
import ProfileDetail from './ProfileDetail';
import Experience from './Experience';
import ProfilePhotoTab from './ProfilePhotoTab';
import ProfileDetailCardHeader from './ProfileDetailCardHeader';




const Settings = ({ t }: any) => {
    const [activeTab, setActiveTab] = useState("1");

    const tabChange = (tab: any) => {
        if (activeTab !== tab) setActiveTab(tab);
    };


    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title={"ProfileSettings"} pageTitle="Pages" />
                    <Row>
                        <Col xxl={3} >
                            <ProfilePhotoTab   />
                        </Col>
                        <Col xxl={9}>
                            <Card>
                                <ProfileDetailCardHeader activeTab={activeTab} tabChange={tabChange}  />
                                <CardBody className="p-4">
                                    <TabContent activeTab={activeTab}>
                                        <TabPane tabId="1">
                                            <ProfileDetail />
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
            </div>
        </React.Fragment>
    );
};

export default withRouter(withTranslation()(Settings));