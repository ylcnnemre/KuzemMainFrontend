import React, { useState } from 'react'
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import withRouter from '../../Common/withRouter'
import { withTranslation } from 'react-i18next'
import EditStudentInfoTab from './EditStudentInfoTab'
import EditStudentCourseInfo from './EditStudentCourseInfo'

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
                <NavItem>
                    <NavLink className={`${activeTab == 3 && "active"}`} onClick={() => { setActiveTab(3) }} >
                        Sertifikalar
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab} style={{ paddingTop: "20px" }}>
                <TabPane tabId={1}  >
                    <EditStudentInfoTab />
                </TabPane>
                <TabPane tabId={2} >
                    <EditStudentCourseInfo />

                </TabPane>
                <TabPane tabId={3} >
                    sertifika

                </TabPane>
            </TabContent>

        </>

    )
}

export default withRouter(withTranslation()(EditStudent))