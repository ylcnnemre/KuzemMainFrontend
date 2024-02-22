import React, { useEffect, useMemo, useState } from 'react'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "swiper/css/effect-flip";
import "./index.scss"
import { Link, Navigate, useNavigate, useNavigation, useParams } from 'react-router-dom';
import { getDetailCourseApi, joinCourseApi } from '../../../api/Course/courseApi';
import { ICourseType } from '../../../api/Course/CourseTypes';
import { CircleLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { Button, Card, CardBody, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCreative, FreeMode, Grid, Navigation, Pagination, Thumbs } from 'swiper/modules';
import { IoTimeOutline } from "react-icons/io5";
import DetailWidget from './DetailWidget';
import { IoMdTime } from 'react-icons/io';
import { IoIosPeople } from "react-icons/io";
import { VscSymbolField } from "react-icons/vsc";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { BsFiletypeJson } from "react-icons/bs";
import { FaRegFilePdf } from "react-icons/fa";
import { FaRegFileWord } from "react-icons/fa";
import { FaFile } from "react-icons/fa";
import { TbFileDescription } from "react-icons/tb";
import useUserStore from '../../../zustand/useUserStore';
import { TfiZoomIn } from 'react-icons/tfi';

const DetailCourse = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [courseDetailData, setCourseDetailData] = useState<ICourseType>()
    const { id } = useParams();
    const { user } = useUserStore()
    const [activeTab, setActiveTab] = useState(1);
    const navigation = useNavigate()

    console.log("user =>", user)

    const DetailCourseRequest = async () => {
        try {
            setLoading(true)

            let response = await getDetailCourseApi(id as string)
            console.log("response ==>", response.data)
            setCourseDetailData(response.data)
        }
        catch (err: any) {
            toast.error(err.response.data.message, {
                autoClose: 1500
            })
            navigation("/kurs")
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        DetailCourseRequest()
    }, [])


    const timeDetail = useMemo(() => {
        if (courseDetailData) {
            return {
                startDate: new Date(courseDetailData?.startDate).toLocaleDateString(),
                endDate: new Date(courseDetailData.endDate).toLocaleDateString()
            }
        }
    }, [courseDetailData?.startDate, courseDetailData?.endDate])

    const documentList = useMemo(() => {
        const iconHandler = (ext: string) => {
            switch (ext) {
                case ".json":
                    return <BsFiletypeJson />
                case ".pdf":
                    return <FaRegFilePdf />
                case ".doc":
                    return <FaRegFileWord />
                default:
                    return <FaFile />
            }
        }
        let response = courseDetailData?.files.filter(el => el.type == "document").map(item => {
            return {
                icon: iconHandler(item.extension),
                path: item.path,
                name: item.name
            }
        })
        return response
    }, [courseDetailData?.files])


    const photoList = useMemo(() => {
        return courseDetailData?.files.filter(el => el.type == "photo")
    }, [courseDetailData?.files])

    const openFile = (path: any) => {
        const fullFilePath = `${import.meta.env.VITE_BASEURL}${path}`;
        window.open(fullFilePath, '_blank');
    };

    const joinCourse = async () => {
        try {
            await joinCourseApi(id as string)
            toast.success("Kayıt işlemi başarılı", {
                autoClose: 1000
            })
            setCourseDetailData({
                ...courseDetailData as ICourseType,
                joinUserList: [...courseDetailData?.joinUserList as any[], user]
            })
        }
        catch (err: any) {
            toast.error(err.response.data.message, {
                autoClose: 1000
            })
        }
    }


    const permission = useMemo(() => {
        const roles = ["admin", "superadmin"]
        return roles.includes(user.role)
    }, [user])

    const courseJoinControl = useMemo(() => {
        return courseDetailData?.joinUserList?.map(el => el?._id).includes(user._id)
    }, [user, courseDetailData?.joinUserList])




    if (loading) {
        return <div style={{ width: "100%", textAlign: "center", display: "flex", justifyContent: "center" }}>
            <CircleLoader color='orange' />
        </div>
    }

    return (
        <Row>
            <Col lg={12}>
                <Card>
                    <CardBody>
                        <Row className='gx-lg-5'>
                            <Col xl={4} md={8} className='mx-auto' >

                                <Swiper grabCursor={true} effect={"creative"} pagination={{ clickable: true }}
                                    creativeEffect={{
                                        prev: { shadow: true, translate: [0, 0, -400], }, next: { translate: ["100%", 0, 0], },
                                    }} modules={[EffectCreative, Pagination, Autoplay]} loop={true} autoplay={{ delay: 2500, disableOnInteraction: false }} className="mySwiper swiper effect-creative-swiper rounded">
                                    <div className="swiper-wrapper">
                                        {
                                            photoList?.map((item, index) => {
                                                return (
                                                    <SwiperSlide key={`${index}`} ><img src={`${import.meta.env.VITE_BASEURL}${item.path}`} alt="" className="img-fluid" style={{ width: "100%", borderRadius: "10px", height: "280px" }} /></SwiperSlide>
                                                )
                                            })
                                        }
                                    </div>
                                </Swiper>
                            </Col>
                            <Col xl={8} >
                                <Row className='course_detail_header_container'>
                                    <Col sm={12}>
                                        <div className='course_detail_header'>
                                            <h4 className='course_title'> {courseDetailData?.title} </h4>
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                {
                                                    !courseJoinControl ? (
                                                        <Button size='sm' className='save_button' onClick={joinCourse}  >
                                                            Kursa Kaydol
                                                        </Button>
                                                    ) : (
                                                        <Button size='sm' disabled className='save_button' style={{ cursor: "not-allowed" }}  >
                                                            Bu kursa kayıtlısınız
                                                        </Button>
                                                    )
                                                }
                                                {
                                                    permission && (
                                                        <Link to={`/kurs/duzenle/${id}`} className='edit_button'>
                                                            <FiEdit className='edit_icon' />
                                                            Düzenle
                                                        </Link>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </Col>

                                </Row>

                                <Row className='gy-3'>
                                    <Col sm={4} >
                                        <DetailWidget icon={<IoTimeOutline />} title='Başlangıç' value={timeDetail?.startDate ?? ""} />
                                    </Col>
                                    <Col sm={4} >
                                        <DetailWidget icon={<IoMdTime />} title='Bitiş' value={timeDetail?.endDate ?? ""} />
                                    </Col>
                                    <Col sm={4} >
                                        <DetailWidget icon={<IoIosPeople />} title='Kontenjan' value={courseDetailData?.quota} />
                                    </Col>
                                    <Col sm={6} >
                                        <DetailWidget icon={<VscSymbolField />} title='Branş' value={courseDetailData?.branch.name} />
                                    </Col>
                                    <Col sm={6} >
                                        <DetailWidget icon={<FaChalkboardTeacher />} title='Eğitmen' value={courseDetailData?.teacher ? `${courseDetailData?.teacher?.name} ${courseDetailData?.teacher?.surname}` : "Seçilmedi"} />
                                    </Col>
                                    <Col sm={12} >
                                        <DetailWidget icon={<TbFileDescription />} title='Açıklama' value={courseDetailData?.description} />
                                    </Col>

                                </Row>


                                {/*  <Row>
                                    {
                                        documentList?.map((item, index) => {
                                            return (
                                                <Col sm={4} key={`${index.toString()}`} >
                                                    <DetailWidget icon={item.icon} title='Dosya' value={item.name.split("-")[0]} onClick={() => {
                                                        openFile(item.path)
                                                    }} />
                                                </Col>
                                            )
                                        })
                                    }

                                </Row> */}
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
            <Col lg={12}>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={`${activeTab == 1 && "active"}`}
                            onClick={() => {
                                setActiveTab(1)
                            }}
                        >
                            Dökümanlar
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={`${activeTab == 2 && "active"}`}
                            onClick={() => {
                                setActiveTab(2)
                            }}
                        >
                            Kurs Programı
                        </NavLink>
                    </NavItem>

                </Nav>
                <TabContent activeTab={activeTab} style={{ paddingTop: "20px" }} className="tab_content" >
                    <TabPane tabId={1}>
                        {
                            documentList?.length !== 0 ? (
                                <Swiper className="swiper_container" slidesPerView={3} grid={{ rows: 1 }} spaceBetween={30} pagination={{ clickable: true }} modules={[Grid]} >
                                    {
                                        documentList?.map((el) => {
                                            return (
                                                <SwiperSlide className="document_slide">
                                                    <div className="document_section">
                                                        <div className="document_section_container">
                                                            <FaRegFilePdf style={{ fontSize: "52px" }} />
                                                            <div className="document_section_content">
                                                                <p className="document_name">
                                                                    <span>İsim :</span> {el.name.split("-")[0]}
                                                                </p>
                                                                <TfiZoomIn className="zoom_icon" />

                                                            </div>
                                                        </div>
                                                        <div className="delete_btn_container">
                                                            <div>
                                                                <Button size="sm" className="delete_btn" color="primary" style={{ marginRight: "10px" }} onClick={() => {
                                                                    openFile(el.path)
                                                                }} >
                                                                    İncele
                                                                </Button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </SwiperSlide>
                                            )
                                        })
                                    }

                                </Swiper>
                            ) : (
                                <div style={{ height: "300px", display: "flex", justifyContent: "start" }} >
                                    <h5 style={{ textTransform: "capitalize" }}>
                                        herhangi bir döküman yok
                                    </h5>
                                </div>
                            )
                        }
                    </TabPane>
                    <TabPane tabId={2}>
                        <div className='schedule_card_container'>
                            {
                                courseDetailData?.schedules?.map((el, index) => {
                                    return (
                                        <div className='schedule_card' key={`${index}`} >
                                            <p className='schedule_card_day'>
                                                Gün : <span style={{ color: "#FFCE02" }} >{el.day}</span>
                                            </p>
                                            <div className='schedule_card_time'>
                                                <p>
                                                    Başlangıç : <span style={{ color: "#FFCE02" }}>{el.startTime}</span>
                                                </p>
                                                <p>
                                                    Bitiş : <span style={{ color: "#FFCE02" }}>{el.endTime}</span>
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </TabPane>

                </TabContent>
            </Col>
        </Row >
    )
}

export default DetailCourse