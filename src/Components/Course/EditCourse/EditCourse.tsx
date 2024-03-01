import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "swiper/css/effect-flip";
import "./index.scss"
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import { toast } from 'react-toastify';
import { deleteCourseApi, deleteCourseSendEmailApi, getDetailCourseApi } from '../../../api/Course/courseApi';
import { useNavigate, useParams } from 'react-router-dom';
import { ICourseType, } from '../../../api/Course/CourseTypes';
import EditCourseInfo from "./EditCourseInfo";
import EditCoursePhoto from "./EditCoursePhoto";
import EditCourseDocumentTab from "./EditCourseDocumentTab";
import EditCourseStudentTab from "./EditCourseStudentTab";
import { PropagateLoader } from "react-spinners";
import EditCourseProgram from "./EditCourseProgram";
import EditCourseAnnouncement from "./EditCourseAnnouncement";
import VerificationInput from "react-verification-input";
import { LuTimer } from "react-icons/lu";
import useCountdown from "@bradgarropy/use-countdown"


const EditCourse = () => {
    const [photoList, setPhotoList] = useState<ICourseType["files"]>([])
    const [documentList, setDocumentList] = useState<ICourseType["files"]>([])
    const [mainData, setMainData] = useState<ICourseType>()
    const [scheduleList, setScheduleList] = useState<ICourseType["schedules"]>([])
    const { id } = useParams()
    const [activeTab, setActiveTab] = useState(1);
    const navigate = useNavigate()
    const [announcementModal, setAnnouncementModal] = useState<boolean>(false)
    const navigation = useNavigate()
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
    const [showDeleteConfirmSection, setShowDeleteConfirmSection] = useState<boolean>(false)
    const [verificationCode, setVerificationCode] = useState<string>("")
    const [disableButtonControl, setDisableButtonControl] = useState<{
        modalButtonDisable: boolean,
        deleteButtonDisable: boolean
    }>({
        modalButtonDisable: false,
        deleteButtonDisable: true
    })

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

    const countdown = useCountdown({
        minutes: 5,
        seconds: 0,
        format: "mm:ss",
        autoStart: false,
        onCompleted: () => {
            setDisableButtonControl({
                modalButtonDisable: false,
                deleteButtonDisable: true
            })
            setShowDeleteConfirmSection(false)
            toast.error("Süre doldu", {
                autoClose: 2000
            })
        }
    })

    const deleteCourse = async () => {
        try {
            await deleteCourseApi({ confirmCode: parseInt(verificationCode), courseId: id as string })
            toast.success("Kurs Silindi", {
                autoClose: 1500
            })
            const sleep = () => {
                return new Promise((resolve) => {
                    setTimeout(resolve, 2000)
                })
            }
            sleep()

            navigate("/kurs")

        }
        catch (err: any) {
            toast.error(err.response.data.message, {
                autoClose: 1500
            })
        }
    }


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
                <NavItem>
                    <NavLink
                        className={`${activeTab == 7 && "active"}`}
                        onClick={() => {
                            setActiveTab(7)
                        }}
                    >
                        İşlemler
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
                <TabPane tabId={7}   >
                    <Row>
                        <Col lg={6}>
                            <div className="delete_course_container">
                                <Button disabled={disableButtonControl.modalButtonDisable} color="danger" className="delete_course_btn" onClick={() => {
                                    setShowDeleteModal(true)
                                }} >
                                    Kursu sil
                                </Button>
                                {
                                    showDeleteConfirmSection && (
                                        <div className="delete_course_confirm">
                                            <div className="timer_container">
                                                <h6>
                                                    Kursu silmek için mailinize gönderilen onay kodunu giriniz
                                                </h6>
                                                <div className="timer_element">
                                                    <LuTimer className="timer_icon" />
                                                    <p style={{ fontWeight: "bold", fontSize: "1rem" }}>
                                                        {countdown.minutes} : {countdown.seconds}
                                                    </p>

                                                </div>
                                            </div>
                                            <div className="verification_input_container" >
                                                <VerificationInput validChars='0-9' autoFocus={true} classNames={{
                                                    character: "character_field",
                                                }} onChange={(e) => {
                                                    setVerificationCode(e)
                                                    if (e.length == 6) {
                                                        setDisableButtonControl({
                                                            ...disableButtonControl,
                                                            deleteButtonDisable: false
                                                        })
                                                    } else {
                                                        setDisableButtonControl({
                                                            ...disableButtonControl,
                                                            deleteButtonDisable: true
                                                        })
                                                    }
                                                }} />
                                            </div>

                                            <div className="delete_course_confirm_container">
                                                <Button disabled={disableButtonControl.deleteButtonDisable} className="delete_course_confirm_button" color="danger" onClick={async () => {
                                                    deleteCourse()
                                                }} >
                                                    Onaylıyorum
                                                </Button>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>

                        </Col>
                        <Col lg={4}>

                        </Col>
                    </Row>
                </TabPane>
            </TabContent>

            <Modal isOpen={showDeleteModal}>
                <ModalHeader>
                    Onay Menüsü
                </ModalHeader>
                <ModalBody>
                    Bu kursu silmek istediğinizden emin misiniz ?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={async () => {
                        try {
                            await deleteCourseSendEmailApi(id as string)
                            countdown.start()
                            setShowDeleteConfirmSection(true)
                            setShowDeleteModal(false)
                            setDisableButtonControl({
                                ...disableButtonControl,
                                modalButtonDisable: true
                            })
                        }
                        catch (err: any) {
                            setShowDeleteModal(false)
                            toast.error(err.message, {
                                autoClose: 1000
                            })
                        }

                    }}


                    >
                        Onayla
                    </Button>
                    <Button color="primary" onClick={() => {
                        setShowDeleteModal(false)
                    }} >
                        İptal
                    </Button>

                </ModalFooter>
            </Modal>
        </>

    )
}

export default EditCourse

