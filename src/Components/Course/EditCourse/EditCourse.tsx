import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "swiper/css/effect-flip";
import "./index.scss"
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Button, Card, CardText, CardTitle, Col, Form, FormFeedback, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import { useFormik } from 'formik';
import * as yup from "yup"
import { toast } from 'react-toastify';
import { addDocumentApi, addPhotoApi, createCourseApi, deleteDocumentApi, deletePhotoApi, getDetailCourseApi, updateCourseApi } from '../../../api/Course/courseApi';
import { getAllBranch } from '../../../api/Branch/BranchApi';
import { getTeacherListApi } from '../../../api/User/UserApi';
import { FaRegFilePdf } from 'react-icons/fa';
import { useNavigate, useNavigation, useParams } from 'react-router-dom';
import { ICourseType, IFiles } from '../../../api/Course/CourseTypes';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Grid, Navigation, Pagination } from 'swiper/modules';
import classNames from "classnames";
import { TfiZoomIn } from "react-icons/tfi";
import { ITeacherType } from "../../../api/User/Teacher/teacherType";
import EditCourseInfo from "./EditCourseInfo";
import { CircleLoader, PropagateLoader } from "react-spinners";
import EditCoursePhoto from "./EditCoursePhoto";
import EditCourseDocumentTab from "./EditCourseDocumentTab";
import EditCourseStudentTab from "./EditCourseStudentTab";


const EditCourse = () => {
    const [photoList, setPhotoList] = useState<ICourseType["files"]>([])
    const [documentList, setDocumentList] = useState<ICourseType["files"]>([])
    const [mainData, setMainData] = useState<ICourseType>()
    const { id } = useParams()
    const [activeTab, setActiveTab] = useState(1);
    const navigation = useNavigate()

    const detailCourseApiRequest = async () => {
        try {
            const response = await getDetailCourseApi(id ?? "")
            console.log("courseDetail ==>", response)
            setMainData(response.data)
            setPhotoList(response.data.files.filter(el => el.type == "photo"))
            setDocumentList(response.data.files.filter(el => el.type == "document"))

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

    const studentData = useMemo(() => {
        if (mainData) {
            return mainData?.joinUserList
        }

    }, [mainData?.joinUserList])

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
                    <EditCourseStudentTab userList={studentData as any[]} />
                </TabPane>
            </TabContent>

        </>

    )
}

export default EditCourse

