import React, { useEffect, useMemo, useState } from 'react'
import ContentLayout from '../../../Layouts/ContentLayout'
import { axiosInstance } from '../../../api/AxiosInstance'
import useUserStore from '../../../zustand/useUserStore'
import { Button, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane, Table } from 'reactstrap'
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { toast } from 'react-toastify'
import { getUserByIdApi } from '../../../api/User/UserApi'
import { IUserData } from '../../../api/User/UserType'
import MyCourseTable from './MyCourseTable'
import { PropagateLoader } from 'react-spinners'
import "./index.scss"
const MyCourseDashboard = () => {
    const [activeTab, setActiveTab] = useState<number>(1)
    const { user: { _id } } = useUserStore()
    const [userData, setUserData] = useState<IUserData>()
    const getUserCourse = async () => {
        try {

            const response = await getUserByIdApi(_id)
            setUserData(response.data)
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


    if (!userData) {
        return <PropagateLoader />
    }

    return (
        <ContentLayout title='Aldığım kurslar' >
            <Nav tabs>
                <NavItem>
                    <NavLink className={`${activeTab == 1 && "active"}`} onClick={() => setActiveTab(1)} >
                        Kurslar
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={`${activeTab == 2 && "active"}`} onClick={() => { setActiveTab(2) }} >
                        Sınavlarım
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={`${activeTab == 3 && "active"}`} onClick={() => { setActiveTab(3) }} >
                        Sertifikalarım
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab} style={{ paddingTop: "20px" }}>
                <TabPane tabId={1}  >
                    <MyCourseTable userData={userData} />
                </TabPane>
                <TabPane tabId={2} >
                    asd
                </TabPane>
                <TabPane tabId={3} >
                    sertifika

                </TabPane>
            </TabContent>
        </ContentLayout>
    )
}

export default MyCourseDashboard