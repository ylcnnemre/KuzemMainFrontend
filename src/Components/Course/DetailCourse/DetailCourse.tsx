import React, { useEffect, useMemo, useState } from 'react'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "swiper/css/effect-flip";
import "./index.scss"
import { Link, Navigate, useNavigate, useNavigation, useParams } from 'react-router-dom';
import { getDetailCourseApi } from '../../../api/Course/courseApi';
import { ICourseType } from '../../../api/Course/CourseTypes';
import { CircleLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCreative, FreeMode, Navigation, Pagination, Thumbs } from 'swiper/modules';
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

const DetailCourse = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const [courseDetailData, setCourseDetailData] = useState<ICourseType>()
    const { id } = useParams();
    const navigation = useNavigate()
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
        let response = courseDetailData?.documents.map(item => {
            return {
                icon: iconHandler(item.extension),
                path: item.path,
                name: item.name
            }
        })
        return response
    }, [courseDetailData?.documents])

    const openFile = (path: any) => {
        const fullFilePath = `${import.meta.env.VITE_BASEURL}${path}`;
        window.open(fullFilePath, '_blank');
    };

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
                                            courseDetailData?.photos.map(item => {
                                                return (
                                                    <SwiperSlide key={`${item}`} ><img src={`${import.meta.env.VITE_BASEURL}${item.path}`} alt="" className="img-fluid" style={{ width: "100%", borderRadius: "10px" , height:"280px" }} /></SwiperSlide>
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
                                            <Link to={`/kurs/duzenle/${id}`} className='edit_button'>
                                                <FiEdit className='edit_icon' />
                                                Düzenle
                                            </Link>
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
                                        <DetailWidget icon={<FaChalkboardTeacher />} title='Eğitmen' value={`${courseDetailData?.teacher.name} ${courseDetailData?.teacher.surname} `} />
                                    </Col>
                                </Row>
                                <Row className='mb-4'>
                                    <Col sm={12}>
                                        <div className="mt-4 text-muted">
                                            <h5 className="fs-14">Açıklama :</h5>
                                            <p>
                                                {courseDetailData?.description}
                                            </p>
                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    {
                                        documentList?.map(item => {
                                            return (
                                                <Col sm={4}>
                                                    <DetailWidget icon={item.icon} title='Dosya' value={item.name.split("-")[0]} onClick={() => {
                                                        openFile(item.path)
                                                    }} />
                                                </Col>
                                            )
                                        })
                                    }

                                </Row>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}

export default DetailCourse