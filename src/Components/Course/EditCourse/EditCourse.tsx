import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "swiper/css/effect-flip";
import "./index.scss"
import React, { useEffect, useMemo, useState } from 'react'
import { Button, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import { toast } from 'react-toastify';
import { getDetailCourseApi } from '../../../api/Course/courseApi';
import { useNavigate, useParams } from 'react-router-dom';
import { ICourseType, } from '../../../api/Course/CourseTypes';
import EditCourseInfo from "./EditCourseInfo";
import EditCoursePhoto from "./EditCoursePhoto";
import EditCourseDocumentTab from "./EditCourseDocumentTab";
import EditCourseStudentTab from "./EditCourseStudentTab";
import { PropagateLoader } from "react-spinners";
import EditCourseProgram from "./EditCourseProgram";
import TeacherCourseAnnouncementModal from "../TeacherCourse/TeacherCourseAnnouncementModal";
import EditCourseAnnouncement from "./EditCourseAnnouncement";


const EditCourse = () => {
    const [photoList, setPhotoList] = useState<ICourseType["files"]>([])
    const [documentList, setDocumentList] = useState<ICourseType["files"]>([])
    const [mainData, setMainData] = useState<ICourseType>()
    const [scheduleList, setScheduleList] = useState<ICourseType["schedules"]>([])
    const { id } = useParams()
    const [activeTab, setActiveTab] = useState(1);
    const [announcementModal, setAnnouncementModal] = useState<boolean>(false)
    const navigation = useNavigate()

    const detailCourseApiRequest = async () => {
        try {
            const response = await getDetailCourseApi(id ?? "")
            console.log("courseDetail ==>", response)
            setMainData(response.data)
            setPhotoList(response.data.files.filter(el => el.type == "photo"))
            setDocumentList(response.data.files.filter(el => el.type == "document"))
            setScheduleList(response.data.schedules)
        }
        catch (err: any) {
            navigation("/kurs")
            toast.error(err.response?.data.message, {
                autoClose: 1500
            })
        }

    }

    useEffect(() => {
        detailCourseApiRequest()
    }, [])

    const announcementList = useMemo(() => {
        return mainData?.announcement
    }, [mainData?.announcement])


    if (!mainData) {
        return (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }} >
                <PropagateLoader color="#36d7b7" />
            </div>
        )
    }

    return (
        <>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={`${activeTab == 1 && "active"}`}
                        onClick={() => {
                            setActiveTab(1)
                        }}
                    >
                        Bilgiler
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={`${activeTab == 2 && "active"}`}
                        onClick={() => {
                            setActiveTab(2)
                        }}
                    >
                        Fotoğraflar
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={`${activeTab == 3 && "active"}`}
                        onClick={() => {
                            setActiveTab(3)
                        }}
                    >
                        Dökümanlar
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={`${activeTab == 4 && "active"}`}
                        onClick={() => {
                            setActiveTab(4)
                        }}
                    >
                        Öğrenciler
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={`${activeTab == 5 && "active"}`}
                        onClick={() => {
                            setActiveTab(5)
                        }}
                    >
                        Kurs Programı
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={`${activeTab == 6 && "active"}`}
                        onClick={() => {
                            setActiveTab(6)
                        }}
                    >
                        Duyurular
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab} style={{ paddingTop: "20px" }} className="tab_content" >
                <TabPane tabId={1}>
                    <EditCourseInfo data={mainData as ICourseType} />
                </TabPane>
                <TabPane tabId={2}>
                    <EditCoursePhoto photoList={photoList} setPhotoList={setPhotoList} />
                </TabPane>
                <TabPane tabId={3}>
                    <EditCourseDocumentTab documentList={documentList} setDocumentList={setDocumentList} />
                </TabPane>
                <TabPane tabId={4}>
                    <EditCourseStudentTab userList={mainData} setUserList={setMainData} />
                </TabPane>
                <TabPane tabId={5}>
                    <EditCourseProgram programList={scheduleList} setProgramList={setScheduleList} />
                </TabPane>
                <TabPane tabId={6}   >
                    <EditCourseAnnouncement data={mainData} setData={setMainData} />
                </TabPane>
            </TabContent>

        </>

    )
}

export default EditCourse

