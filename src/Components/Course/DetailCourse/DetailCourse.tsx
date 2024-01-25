import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useNavigation, useParams } from 'react-router-dom';
import { getDetailCourseApi } from '../../../api/Course/courseApi';
import { ICourseType } from '../../../api/Course/CourseTypes';
import { CircleLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { Card, CardBody, Col, Pagination, Row } from 'reactstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCreative, FreeMode, Navigation, Thumbs } from 'swiper/modules';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "swiper/css/effect-flip";


const DetailCourse = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const [courseDetailData, setCourseDetailData] = useState<ICourseType>()
    const { id } = useParams();
    const navigation = useNavigate()
    const DetailCourse = async () => {
        try {
            setLoading(true)
            console.log("idd ==>",id)
            let response = await getDetailCourseApi(id as string)
            setCourseDetailData(response.data)
        }
        catch (err: any) {
            toast.error(err.response.data.message, {
                autoClose: 1500
            })
           /*  navigation("/kurs") */
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        DetailCourse()
    }, [])

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
                        <Row>
                            <Col xl={4} md={8} className='mx-auto' >

                                <Swiper grabCursor={true} effect={"creative"} pagination={{ clickable: true }}
                                    creativeEffect={{
                                        prev: { shadow: true, translate: [0, 0, -400], }, next: { translate: ["100%", 0, 0], },
                                    }} modules={[EffectCreative, Pagination, Autoplay]} loop={true} autoplay={{ delay: 2500, disableOnInteraction: false }} className="mySwiper swiper effect-creative-swiper rounded">
                                    <div className="swiper-wrapper">
                                        {
                                            courseDetailData?.photos.map(item => {
                                                return (
                                                    <SwiperSlide key={`${item}`} ><img src={`${import.meta.env.VITE_BASEURL}${item}`} alt="" className="img-fluid" style={{ width: "100%", borderRadius: "10px" }} /></SwiperSlide>
                                                )
                                            })
                                        }
                                    </div>
                                </Swiper>

                            </Col>

                        </Row>

                    </CardBody>

                </Card>
            </Col>
        </Row>
    )
}

export default DetailCourse