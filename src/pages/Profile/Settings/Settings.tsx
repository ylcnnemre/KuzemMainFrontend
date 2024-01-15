import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Container, Form, Input, Label, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import classnames from "classnames";
import Flatpickr from "react-flatpickr";
import avatar1 from "../../../assets/images/users/avatar-1.jpg";
import withRouter from '../../../Components/Common/withRouter';
import { withTranslation } from 'react-i18next';
import useUserStore from '../../../zustand/useUserStore';
import { getUserByIdApi } from '../../../api/User/User';

const Settings = ({ t }: any) => {
    const [activeTab, setActiveTab] = useState("1");
    const [textarea, setTextArea] = useState("You always want to make sure that your fonts work well together and try to limit the number of fonts you use to three or less. Experiment and play around with the fonts that you already have in the software you're working with reputable font websites.")
    const { user } = useUserStore()
    const textArea = (e: any) => {
        setTextArea(e.target.value)
    }

    const tabChange = (tab: any) => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    document.title = "Profile Settings | Velzon - React Admin & Dashboard Template";

    const getUserInfo = async () => {
        const { data } = await getUserByIdApi(user._id)
        
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title={"ProfileSettings"} pageTitle="Pages" />
                    <Row>
                        <Col xxl={3}>
                            <Card className="card-bg-fill">
                                <CardBody className="p-4">
                                    <div className="text-center">
                                        <div className="profile-user position-relative d-inline-block mx-auto  mb-4">
                                            <img src={avatar1}
                                                className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                                                alt="user-profile" />
                                            <div className="avatar-xs p-0 rounded-circle profile-photo-edit">
                                                <Input id="profile-img-file-input" type="file"
                                                    className="profile-img-file-input" />
                                                <Label htmlFor="profile-img-file-input"
                                                    className="profile-photo-edit avatar-xs">
                                                    <span className="avatar-title rounded-circle bg-light text-body">
                                                        <i className="ri-camera-fill"></i>
                                                    </span>
                                                </Label>
                                            </div>
                                        </div>
                                        <h5 className="fs-16 mb-1">
                                            {user.name}
                                        </h5>
                                        {/*     <p className="text-muted mb-0">Lead Designer / Developer</p> */}
                                    </div>
                                </CardBody>
                            </Card>


                        </Col>

                        <Col xxl={9}>
                            <Card>
                                <CardHeader>
                                    <Nav className="nav-tabs-custom rounded card-header-tabs border-bottom-0"
                                        role="tablist">
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: activeTab === "1" })}
                                                onClick={() => {
                                                    tabChange("1");
                                                }}>
                                                <i className="fas fa-home"></i>
                                                {t("PersonelDetail")}
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink to="#"
                                                className={classnames({ active: activeTab === "2" })}
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
                                                className={classnames({ active: activeTab === "3" })}
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
                                <CardBody className="p-4">
                                    <TabContent activeTab={activeTab}>
                                        <TabPane tabId="1">
                                            <Form>
                                                <Row>
                                                    <Col lg={6}>
                                                        <div className="mb-3">
                                                            <Label htmlFor="firstnameInput" className="form-label">
                                                                {t("FirstName")}
                                                            </Label>
                                                            <Input type="text" className="form-control" id="firstnameInput"
                                                                placeholder="Enter your firstname" defaultValue="Dave" />
                                                        </div>
                                                    </Col>
                                                    <Col lg={6}>
                                                        <div className="mb-3">
                                                            <Label htmlFor="lastnameInput" className="form-label">
                                                                {t("LastName")}
                                                            </Label>
                                                            <Input type="text" className="form-control" id="lastnameInput"
                                                                placeholder="Enter your lastname" defaultValue="Adame" />
                                                        </div>
                                                    </Col>
                                                    <Col lg={6}>
                                                        <div className="mb-3">
                                                            <Label htmlFor="phonenumberInput" className="form-label">
                                                                Tc No
                                                            </Label>
                                                            <Input type="text" className="form-control disabled-input"
                                                                disabled


                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col lg={6}>
                                                        <div className="mb-3">
                                                            <Label htmlFor="phonenumberInput" className="form-label">
                                                                {t("BirthDate")}
                                                            </Label>
                                                            <Flatpickr className='form-control' />
                                                        </div>
                                                    </Col>
                                                    <Col lg={6}>
                                                        <div className="mb-3">
                                                            <Label htmlFor="phonenumberInput" className="form-label">
                                                                {t("Phone")}
                                                            </Label>
                                                            <Input type="text" className="form-control disabled-input"
                                                                disabled
                                                                id="phonenumberInput"
                                                                placeholder="Enter your phone number"
                                                                defaultValue="+(1) 987 6543" />
                                                        </div>
                                                    </Col>
                                                    <Col lg={6}>
                                                        <div className="mb-3">
                                                            <Label htmlFor="emailInput" className="form-label ">Email</Label>
                                                            <Input type="email" className="form-control disabled-input" id="emailInput"
                                                                placeholder="Enter your email"
                                                                defaultValue="daveadame@velzon.com" />
                                                        </div>
                                                    </Col>

                                                    <Col lg={6}>
                                                        <div className="mb-3">
                                                            <Label htmlFor="emailInput" className="form-label">
                                                                {t("Gender")}
                                                            </Label>
                                                            <select className='form-control'>
                                                                <option value="erkek">
                                                                    {t("Male")}
                                                                </option>
                                                                <option value="kadın">
                                                                    {t("Female")}
                                                                </option>
                                                            </select>
                                                        </div>
                                                    </Col>
                                                    <Col lg={6}>
                                                        <div className="mb-3">
                                                            <Label htmlFor="emailInput" className="form-label">
                                                                {t("Role")}
                                                            </Label>
                                                            <Input type="text" className="form-control disabled-input"
                                                                disabled
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col lg={12}>
                                                        <div className="hstack gap-2 justify-content-end">
                                                            <button type="button"
                                                                className="btn btn-primary">Updates</button>
                                                            <button type="button"
                                                                className="btn btn-soft-danger">Cancel</button>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Form>
                                        </TabPane>

                                        <TabPane tabId="2">
                                            <Form>
                                                <Row className="g-2">
                                                    <Col lg={4}>
                                                        <div>
                                                            <Label htmlFor="oldpasswordInput" className="form-label">Old
                                                                Password*</Label>
                                                            <Input type="password" className="form-control"
                                                                id="oldpasswordInput"
                                                                placeholder="Enter current password" />
                                                        </div>
                                                    </Col>

                                                    <Col lg={4}>
                                                        <div>
                                                            <Label htmlFor="newpasswordInput" className="form-label">New
                                                                Password*</Label>
                                                            <Input type="password" className="form-control"
                                                                id="newpasswordInput" placeholder="Enter new password" />
                                                        </div>
                                                    </Col>

                                                    <Col lg={4}>
                                                        <div>
                                                            <Label htmlFor="confirmpasswordInput" className="form-label">Confirm
                                                                Password*</Label>
                                                            <Input type="password" className="form-control"
                                                                id="confirmpasswordInput"
                                                                placeholder="Confirm password" />
                                                        </div>
                                                    </Col>

                                                    <Col lg={12}>
                                                        <div className="mb-3">
                                                            <Link to="#"
                                                                className="link-primary text-decoration-underline">Forgot
                                                                Password ?</Link>
                                                        </div>
                                                    </Col>

                                                    <Col lg={12}>
                                                        <div className="text-end">
                                                            <button type="button" className="btn btn-primary">Change
                                                                Password</button>
                                                        </div>
                                                    </Col>

                                                </Row>

                                            </Form>
                                            <div className="mt-4 mb-3 border-bottom pb-2">
                                                <div className="float-end">
                                                    <Link to="#" className="link-primary">All Logout</Link>
                                                </div>
                                                <h5 className="card-title">Login History</h5>
                                            </div>
                                            <div className="d-flex align-items-center mb-3">
                                                <div className="flex-shrink-0 avatar-sm">
                                                    <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                                                        <i className="ri-smartphone-line"></i>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h6>iPhone 12 Pro</h6>
                                                    <p className="text-muted mb-0">Los Angeles, United States - March 16 at
                                                        2:47PM</p>
                                                </div>
                                                <div>
                                                    <Link to="#">Logout</Link>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center mb-3">
                                                <div className="flex-shrink-0 avatar-sm">
                                                    <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                                                        <i className="ri-tablet-line"></i>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h6>Apple iPad Pro</h6>
                                                    <p className="text-muted mb-0">Washington, United States - November 06
                                                        at 10:43AM</p>
                                                </div>
                                                <div>
                                                    <Link to="#">Logout</Link>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center mb-3">
                                                <div className="flex-shrink-0 avatar-sm">
                                                    <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                                                        <i className="ri-smartphone-line"></i>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h6>Galaxy S21 Ultra 5G</h6>
                                                    <p className="text-muted mb-0">Conneticut, United States - June 12 at
                                                        3:24PM</p>
                                                </div>
                                                <div>
                                                    <Link to="#">Logout</Link>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <div className="flex-shrink-0 avatar-sm">
                                                    <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                                                        <i className="ri-macbook-line"></i>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h6>Dell Inspiron 14</h6>
                                                    <p className="text-muted mb-0">Phoenix, United States - July 26 at
                                                        8:10AM</p>
                                                </div>
                                                <div>
                                                    <Link to="#">Logout</Link>
                                                </div>
                                            </div>
                                        </TabPane>

                                        <TabPane tabId="3">
                                            <form>
                                                <div id="newlink">
                                                    <div id="1">
                                                        <Row>
                                                            <Col lg={12}>
                                                                <div className="mb-3">
                                                                    <Label htmlFor="jobTitle" className="form-label">Job
                                                                        Title</Label>
                                                                    <Input type="text" className="form-control"
                                                                        id="jobTitle" placeholder="Job title"
                                                                        defaultValue="Lead Designer / Developer" />
                                                                </div>
                                                            </Col>

                                                            <Col lg={6}>
                                                                <div className="mb-3">
                                                                    <Label htmlFor="companyName" className="form-label">Company
                                                                        Name</Label>
                                                                    <Input type="text" className="form-control"
                                                                        id="companyName" placeholder="Company name"
                                                                        defaultValue="Themesbrand" />
                                                                </div>
                                                            </Col>

                                                            <Col lg={6}>
                                                                <div className="mb-3">
                                                                    <label htmlFor="experienceYear"
                                                                        className="form-label">Experience Years</label>
                                                                    <Row>
                                                                        <Col lg={5}>
                                                                            <select className="form-control" data-choices
                                                                                data-choices-search-false
                                                                                name="experienceYear"
                                                                                id="experienceYear">
                                                                                <option defaultValue="">Select years</option>
                                                                                <option value="Choice 1">2001</option>
                                                                                <option value="Choice 2">2002</option>
                                                                                <option value="Choice 3">2003</option>
                                                                                <option value="Choice 4">2004</option>
                                                                                <option value="Choice 5">2005</option>
                                                                                <option value="Choice 6">2006</option>
                                                                                <option value="Choice 7">2007</option>
                                                                                <option value="Choice 8">2008</option>
                                                                                <option value="Choice 9">2009</option>
                                                                                <option value="Choice 10">2010</option>
                                                                                <option value="Choice 11">2011</option>
                                                                                <option value="Choice 12">2012</option>
                                                                                <option value="Choice 13">2013</option>
                                                                                <option value="Choice 14">2014</option>
                                                                                <option value="Choice 15">2015</option>
                                                                                <option value="Choice 16">2016</option>
                                                                                <option value="Choice 17" >2017</option>
                                                                                <option value="Choice 18">2018</option>
                                                                                <option value="Choice 19">2019</option>
                                                                                <option value="Choice 20">2020</option>
                                                                                <option value="Choice 21">2021</option>
                                                                                <option value="Choice 22">2022</option>
                                                                            </select>
                                                                        </Col>

                                                                        <div className="col-auto align-self-center">
                                                                            to
                                                                        </div>

                                                                        <Col lg={5}>
                                                                            <select className="form-control" data-choices
                                                                                data-choices-search-false
                                                                                name="choices-single-default2">
                                                                                <option defaultValue="">Select years</option>
                                                                                <option value="Choice 1">2001</option>
                                                                                <option value="Choice 2">2002</option>
                                                                                <option value="Choice 3">2003</option>
                                                                                <option value="Choice 4">2004</option>
                                                                                <option value="Choice 5">2005</option>
                                                                                <option value="Choice 6">2006</option>
                                                                                <option value="Choice 7">2007</option>
                                                                                <option value="Choice 8">2008</option>
                                                                                <option value="Choice 9">2009</option>
                                                                                <option value="Choice 10">2010</option>
                                                                                <option value="Choice 11">2011</option>
                                                                                <option value="Choice 12">2012</option>
                                                                                <option value="Choice 13">2013</option>
                                                                                <option value="Choice 14">2014</option>
                                                                                <option value="Choice 15">2015</option>
                                                                                <option value="Choice 16">2016</option>
                                                                                <option value="Choice 17">2017</option>
                                                                                <option value="Choice 18">2018</option>
                                                                                <option value="Choice 19">2019</option>
                                                                                <option value="Choice 20">2020</option>
                                                                                <option value="Choice 21">2021</option>
                                                                                <option value="Choice 22">2022</option>
                                                                            </select>
                                                                        </Col>
                                                                    </Row>
                                                                </div>
                                                            </Col>

                                                            <Col lg={12}>
                                                                <div className="mb-3">
                                                                    <Label htmlFor="jobDescription" className="form-label">Job
                                                                        Description</Label>
                                                                    <Input type='textarea'
                                                                        className="form-control"
                                                                        value={textarea}
                                                                        rows="3"
                                                                        placeholder="Enter description"
                                                                        onChange={(e) => textArea(e)}
                                                                    />

                                                                </div>
                                                            </Col>

                                                            <div className="hstack gap-2 justify-content-end">
                                                                <Link className="btn btn-primary"
                                                                    to="#">Delete</Link>
                                                            </div>
                                                        </Row>
                                                    </div>
                                                </div>
                                                <div id="newForm" style={{ "display": "none" }}>
                                                </div>

                                                <Col lg={12}>
                                                    <div className="hstack gap-2">
                                                        <button type="submit" className="btn btn-success">Update</button>
                                                        <Link to="#" className="btn btn-primary">Add
                                                            New</Link>
                                                    </div>
                                                </Col>
                                            </form>
                                        </TabPane>

                                        <TabPane tabId="4">
                                            <div className="mb-4 pb-2">
                                                <h5 className="card-title text-decoration-underline mb-3">Security:</h5>
                                                <div className="d-flex flex-column flex-sm-row mb-4 mb-sm-0">
                                                    <div className="flex-grow-1">
                                                        <h6 className="fs-14 mb-1">Two-factor Authentication</h6>
                                                        <p className="text-muted">Two-factor authentication is an enhanced
                                                            security meansur. Once enabled, you'll be required to give
                                                            two types of identification when you log into Google
                                                            Authentication and SMS are Supported.</p>
                                                    </div>
                                                    <div className="flex-shrink-0 ms-sm-3">
                                                        <Link to="#"
                                                            className="btn btn-sm btn-primary">Enable Two-facor
                                                            Authentication</Link>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-column flex-sm-row mb-4 mb-sm-0 mt-2">
                                                    <div className="flex-grow-1">
                                                        <h6 className="fs-14 mb-1">Secondary Verification</h6>
                                                        <p className="text-muted">The first factor is a password and the
                                                            second commonly includes a text with a code sent to your
                                                            smartphone, or biometrics using your fingerprint, face, or
                                                            retina.</p>
                                                    </div>
                                                    <div className="flex-shrink-0 ms-sm-3">
                                                        <Link to="#" className="btn btn-sm btn-primary">Set
                                                            up secondary method</Link>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-column flex-sm-row mb-4 mb-sm-0 mt-2">
                                                    <div className="flex-grow-1">
                                                        <h6 className="fs-14 mb-1">Backup Codes</h6>
                                                        <p className="text-muted mb-sm-0">A backup code is automatically
                                                            generated for you when you turn on two-factor authentication
                                                            through your iOS or Android Twitter app. You can also
                                                            generate a backup code on twitter.com.</p>
                                                    </div>
                                                    <div className="flex-shrink-0 ms-sm-3">
                                                        <Link to="#"
                                                            className="btn btn-sm btn-primary">Generate backup codes</Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <h5 className="card-title text-decoration-underline mb-3">Application Notifications:</h5>
                                                <ul className="list-unstyled mb-0">
                                                    <li className="d-flex">
                                                        <div className="flex-grow-1">
                                                            <label htmlFor="directMessage"
                                                                className="form-check-label fs-14">Direct messages</label>
                                                            <p className="text-muted">Messages from people you follow</p>
                                                        </div>
                                                        <div className="flex-shrink-0">
                                                            <div className="form-check form-switch">
                                                                <Input className="form-check-input" type="checkbox"
                                                                    role="switch" id="directMessage" defaultChecked />
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="d-flex mt-2">
                                                        <div className="flex-grow-1">
                                                            <Label className="form-check-label fs-14"
                                                                htmlFor="desktopNotification">
                                                                Show desktop notifications
                                                            </Label>
                                                            <p className="text-muted">Choose the option you want as your
                                                                default setting. Block a site: Next to "Not allowed to
                                                                send notifications," click Add.</p>
                                                        </div>
                                                        <div className="flex-shrink-0">
                                                            <div className="form-check form-switch">
                                                                <Input className="form-check-input" type="checkbox"
                                                                    role="switch" id="desktopNotification" defaultChecked />
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="d-flex mt-2">
                                                        <div className="flex-grow-1">
                                                            <Label className="form-check-label fs-14"
                                                                htmlFor="emailNotification">
                                                                Show email notifications
                                                            </Label>
                                                            <p className="text-muted"> Under Settings, choose Notifications.
                                                                Under Select an account, choose the account to enable
                                                                notifications for. </p>
                                                        </div>
                                                        <div className="flex-shrink-0">
                                                            <div className="form-check form-switch">
                                                                <Input className="form-check-input" type="checkbox"
                                                                    role="switch" id="emailNotification" />
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="d-flex mt-2">
                                                        <div className="flex-grow-1">
                                                            <Label className="form-check-label fs-14"
                                                                htmlFor="chatNotification">
                                                                Show chat notifications
                                                            </Label>
                                                            <p className="text-muted">To prevent duplicate mobile
                                                                notifications from the Gmail and Chat apps, in settings,
                                                                turn off Chat notifications.</p>
                                                        </div>
                                                        <div className="flex-shrink-0">
                                                            <div className="form-check form-switch">
                                                                <Input className="form-check-input" type="checkbox"
                                                                    role="switch" id="chatNotification" />
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="d-flex mt-2">
                                                        <div className="flex-grow-1">
                                                            <Label className="form-check-label fs-14"
                                                                htmlFor="purchaesNotification">
                                                                Show purchase notifications
                                                            </Label>
                                                            <p className="text-muted">Get real-time purchase alerts to
                                                                protect yourself from fraudulent charges.</p>
                                                        </div>
                                                        <div className="flex-shrink-0">
                                                            <div className="form-check form-switch">
                                                                <Input className="form-check-input" type="checkbox"
                                                                    role="switch" id="purchaesNotification" />
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h5 className="card-title text-decoration-underline mb-3">Delete This
                                                    Account:</h5>
                                                <p className="text-muted">Go to the Data & Privacy section of your profile
                                                    Account. Scroll to "Your data & privacy options." Delete your
                                                    Profile Account. Follow the instructions to delete your account :
                                                </p>
                                                <div>
                                                    <Input type="password" className="form-control" id="passwordInput"
                                                        placeholder="Enter your password" defaultValue="make@321654987"
                                                        style={{ maxWidth: "265px" }} />
                                                </div>
                                                <div className="hstack gap-2 mt-3">
                                                    <Link to="#" className="btn btn-soft-danger">Close &
                                                        Delete This Account</Link>
                                                    <Link to="#" className="btn btn-light">Cancel</Link>
                                                </div>
                                            </div>
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