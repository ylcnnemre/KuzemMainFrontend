import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IUserData } from '../../../api/User/UserType'
import { cityList } from '../../../common/constants/city'
import { toast } from 'react-toastify'
import { getUserByIdApi, updateUserApi } from '../../../api/User/UserApi'
import { useFormik } from 'formik'
import * as yup from "yup"
import { PropagateLoader } from 'react-spinners'
import { Col, Form, FormFeedback, Input, Label, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap'
import withRouter from '../../Common/withRouter'
import { withTranslation } from 'react-i18next'
import EditStudentInfoTab from './EditStudentInfoTab'

const today = new Date();
const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
const eightyYearsAgo = new Date(today.getFullYear() - 80, today.getMonth(), today.getDate());

const EditStudent = ({ t }: any) => {
    const [activeTab, setActiveTab] = useState<number>(1)

    return (
        <>
            <Nav tabs>
                <NavItem>
                    <NavLink className={`${activeTab == 1 && "active"}`} onClick={() => setActiveTab(1)} >
                        Bilgiler
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={`${activeTab == 2 && "active"}`} onClick={() => { setActiveTab(2) }} >
                        Aldığı Kurslar
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab} style={{ paddingTop: "20px" }}>
                <TabPane tabId={1}  >
                    <EditStudentInfoTab />
                </TabPane>
                <TabPane tabId={2} >
                    <h3>
                        adasd
                    </h3>
                </TabPane>
            </TabContent>

        </>

    )
}

export default withRouter(withTranslation()(EditStudent))