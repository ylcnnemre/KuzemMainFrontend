import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import "./index.scss"
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "swiper/css/effect-flip";
import { getAllCourseApi } from '../../../api/Course/courseApi'
import { IGetAllTypes } from '../../../api/Course/CourseTypes'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectCreative, EffectFade, Pagination } from 'swiper/modules'
import { CircleLoader } from 'react-spinners'
import { Col, PaginationItem, PaginationLink, Row, Pagination as PageList, Input } from 'reactstrap'
const CourseDashboard = () => {
    const [courseData, setCourseData] = useState<IGetAllTypes[]>([])
    const [tempData, setTempData] = useState<IGetAllTypes[]>([])
    const [pageNumbers, setPageNumbers] = useState<number[]>([])
    const [temp2, setTemp2] = useState<IGetAllTypes[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [currentPage, setCurrentPage] = useState(1);

    const getCourseList = async () => {
        try {
            setLoading(true)
            const testList = []
            const response = await getAllCourseApi()
            for (let item = 0; item < 16; item++) {
                testList.push(...response.data.map(el => {
                    return {
                        ...el,
                        title: el.title + item
                    }
                }))
            }
            setCourseData(testList)
            setTempData(sliceData(testList, 1))
            setTemp2(testList)
            setPageNumbers(Array.from({ length: Math.ceil(testList.length / 8) }, (_, index) => index + 1))
        }
        catch (err) {
            console.log("errr =>", err)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getCourseList()
    }, [])



    const sliceData = (elemens: Array<any>, currentIndex: number) => {
        var sliceLength = 8
        var startIndex = (currentIndex - 1) * sliceLength
        var endIndex = startIndex + sliceLength
        let result = elemens.slice(startIndex, endIndex)
        return result
    }

    const searchOnChange = (e: any) => {
        let result = courseData.filter(item => {
            if (item.title.toLowerCase().search(e.target.value.toLowerCase()) !== -1) {
                return item
            }
        })
        let res = sliceData(result, currentPage)
        setTempData(res)
        setTemp2(result)
        setPageNumbers(Array.from({ length: result.length / 8 }, (_, index) => index + 1))
    }

    if (loading) {
        return <CircleLoader />
    }
    return (
        <div className='course_container mx-2 mt-2'>
            <div className='filter_section'  >
                <Input placeholder='search' className='search_input' onChange={searchOnChange} />
                <Link className='btn btn-success px-4 py-1 brans_link' to={"/kurs/ekle"} >
                    Kurs Ekle
                </Link>
            </div>
            <Row  >
                {
                    tempData.map(item => {
                        return (
                            <Col sm={3} key={`${item._id + Math.random().toString()}`} >
                                <div className='card_container'  >
                                    <Swiper grabCursor={true} effect={"creative"} pagination={{ clickable: true }}
                                        creativeEffect={{
                                            prev: { shadow: true, translate: [0, 0, -400], }, next: { translate: ["100%", 0, 0], },
                                        }} modules={[EffectCreative, Pagination, Autoplay]} loop={true} autoplay={{ delay: 2500, disableOnInteraction: false }} className="mySwiper swiper effect-creative-swiper rounded">
                                        <div className="swiper-wrapper">
                                            {
                                                item.photos.map(el => {
                                                    return (
                                                        <SwiperSlide><img src={`${import.meta.env.VITE_BASEURL}${el}`} alt="" className="img-fluid" style={{ width: "100%", borderRadius: "10px" }} /></SwiperSlide>
                                                    )
                                                })
                                            }
                                        </div>
                                    </Swiper>
                                    <div className='card_content'>
                                        <h5>
                                            {item.title}
                                        </h5>
                                    </div>
                                </div>
                            </Col>
                        )
                    })
                }

                <div className='pagination_section'>
                    <PageList>
                        {pageNumbers.map((item) => (
                            <PaginationItem key={`${item}-${Math.random()} `} active={item === currentPage}>
                                <PaginationLink onClick={() => {
                                    let result = sliceData(temp2, item)
                                    setTempData(result)
                                    setCurrentPage(item)
                                }} >{item}</PaginationLink>
                            </PaginationItem>
                        ))}
                    </PageList>
                </div>
            </Row>


        </div>
    )
}

export default CourseDashboard