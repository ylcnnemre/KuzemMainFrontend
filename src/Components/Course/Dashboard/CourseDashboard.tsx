import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./index.scss"
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "swiper/css/effect-flip";
import { getAllCourseByStatusApi } from '../../../api/Course/courseApi'
import { ICourseType } from '../../../api/Course/CourseTypes'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectCreative, EffectFade, Pagination } from 'swiper/modules'
import { CircleLoader } from 'react-spinners'
import { Col, PaginationItem, PaginationLink, Row, Pagination as PageList, Input, Button } from 'reactstrap'
import { toast } from 'react-toastify';
import useUserStore from '../../../zustand/useUserStore';
import { Permission } from '../../../common/constants/PermissionList';
import { FaUser } from 'react-icons/fa';
import { Select } from 'antd';



const CourseDashboard = () => {
    const [courseData, setCourseData] = useState<ICourseType[]>([])
    const [tempData, setTempData] = useState<ICourseType[]>([])
    const [pageNumbers, setPageNumbers] = useState<number[]>([])
    const [temp2, setTemp2] = useState<ICourseType[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [active, setActive] = useState<"aktif" | "pasif">("aktif")
    const { user: { permission, role } } = useUserStore()
    const navigate = useNavigate()
    const showPageCourseCount = 8   //sayfada kaç adet kurs gözükecek  mobil için 4 uygun
    console.log("permis on =>>", permission)
    const getCourseList = async (status: "aktif" | "pasif") => {
        try {
            setLoading(true)
            const testList = []
            const response = await getAllCourseByStatusApi(status)
            console.log("responseCoursee ==>", response)
            testList.push(...response.data.map(el => {
                return {
                    ...el,
                    title: el.title
                }
            }))
            /*  for (let item = 0; item < 5; item++) {
                 testList.push(...response.data.map(el => {
                     return {
                         ...el,
                         title: el.title + item
                     }
                 }))
             } */
            setCourseData(testList)
            setTempData(sliceData(testList, 1))
            setTemp2(testList)
            setPageNumbers(Array.from({ length: Math.ceil(testList.length / showPageCourseCount) }, (_, index) => index + 1))
        }
        catch (err: any) {
            console.log("err ===>", err)
            toast.error(err.response.data.message, {
                autoClose: 1500
            })
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getCourseList("aktif")
    }, [])


    const sliceData = (elemens: Array<any>, currentIndex: number) => {
        var sliceLength = showPageCourseCount
        var startIndex = (currentIndex - 1) * sliceLength
        var endIndex = startIndex + sliceLength
        let result = elemens.slice(startIndex, endIndex)
        return result
    }
    const divideChunks = (len: number) => {
        let mod = len % showPageCourseCount
        let divide = Math.floor(len / showPageCourseCount)
        const result = [];
        for (let i = 1; i <= divide; i++) {
            result.push(i);
        }
        if (mod !== 0) {
            result.push(divide + 1)
        }
        return result;
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
        setPageNumbers(divideChunks(result.length))
    }

    const activePassiveOnChange = (element: any) => {
        getCourseList(element)
        setActive(element)
    }

    const permissionControl = useMemo(() => {
        return permission.includes(Permission.COURSE_ADD)
    }, [permission])


    const roleControl = useMemo(() => {
        return role == "admin" || role == "superadmin"
    }, [role])


    if (loading) {
        return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
            <CircleLoader color='#FFCE02' />
        </div>
    }
    return (
        <div className='course_container mx-2 mt-2'>
            <div className='filter_section'  >
                <div style={{ display: "flex", alignItems: "center" }} >
                    <Input placeholder='search' className='search_input' onChange={searchOnChange} />
                    {
                        roleControl && (
                            <select className='form-control' value={active} style={{ marginLeft: "20px", paddingLeft: "30px", paddingRight: "30px" }} onChange={(e) => {
                                activePassiveOnChange(e.target.value)
                            }} >
                                <option value="aktif">Aktif Kurslar</option>
                                <option value="pasif">Pasif Kurslar</option>
                            </select>
                        )
                    }
                </div>

                {
                    permissionControl && (
                        <Link className='btn btn-success px-4 py-1 brans_link' to={"/kurs/ekle"} >
                            Kurs Ekle
                        </Link>
                    )
                }
            </div>
            <Row style={{ marginTop: "10px" }}  >
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
                                                item.files.filter(el => el.type == "photo").map(el => {
                                                    return (
                                                        <SwiperSlide key={`${el._id + Math.random().toString()}`} ><img src={`${import.meta.env.VITE_BASEURL}${el.path}`} alt="" className="img-fluid swiper-img-element" style={{ borderRadius: "10px" }} /></SwiperSlide>
                                                    )
                                                })
                                            }
                                        </div>
                                    </Swiper>
                                    <div className='test_content'>
                                        <div className='test_header'>
                                            <h5 className='test_title'>
                                                {item.title}
                                            </h5>

                                            <p className='test_quota' style={{ display: "flex", alignItems: "center" }} >
                                                <FaUser /> <span style={{ marginLeft: "3px" }} >
                                                    {item.quota}
                                                </span>
                                            </p>
                                        </div>
                                        <div className='test_footer'>
                                            <Link to={`/kurs/${item._id}`} className='detail_link'  >
                                                İncele
                                            </Link>
                                        </div>

                                    </div>
                                </div>
                            </Col>
                        )
                    })
                }

                <div className='pagination_section'>
                    <PageList>
                        {pageNumbers.map((item) => {
                            return (
                                <PaginationItem key={`${item}-${Math.random()} `} active={item === currentPage}>
                                    <PaginationLink onClick={() => {
                                        let result = sliceData(temp2, item)
                                        setTempData(result)
                                        setCurrentPage(item)
                                    }} >{item}</PaginationLink>
                                </PaginationItem>
                            )
                        })}
                    </PageList>
                </div>
            </Row>


        </div>
    )
}

export default CourseDashboard