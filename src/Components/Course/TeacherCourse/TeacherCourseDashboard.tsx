import React, { useEffect, useMemo, useState } from 'react'
import ContentLayout from '../../../Layouts/ContentLayout'
import { Button, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane, Table } from 'reactstrap'
import { courseTeacherListApi } from '../../../api/Course/courseApi'
import { ICourseType } from '../../../api/Course/CourseTypes'
import { toast } from 'react-toastify'
import TeacherCourseTable from './TeacherCourseTable'

const TeacherCourseDashboard = () => {
    const [activeTab, setActiveTab] = useState<number>(1)
    const [courseList, setCourseList] = useState<ICourseType[]>([])
    const getUserCourse = async () => {
        try {
            const response = await courseTeacherListApi()
            setCourseList(response.data)
        }
        catch (err: any) {
            toast.error(err.message, {
                autoClose: 1000
            })
        }
        finally {

        }
    }

    useEffect(() => {
        getUserCourse()
    }, [])


    return (
        <ContentLayout title='Verdiğim kurslar' >
            <Nav tabs>
                <NavItem>
                    <NavLink className={`${activeTab == 1 && "active"}`} onClick={() => setActiveTab(1)} >
                       Verdiğim Kurslar
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab} style={{ paddingTop: "20px" }}>
                <TabPane tabId={1}  >
                    <TeacherCourseTable data={courseList} />
                </TabPane>
            </TabContent>

        </ContentLayout>
    )
}

export default TeacherCourseDashboard