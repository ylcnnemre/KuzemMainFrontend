import { useFormik } from 'formik';
import React, { FC, useEffect, useState } from 'react'
import { Button, Col, Form, FormFeedback, Input, Label, Row } from 'reactstrap'
import * as yup from "yup"
import { getDetailCourseApi, updateCourseApi } from '../../../api/Course/courseApi';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ITeacherType } from '../../../api/User/Teacher/teacherType';
import { getTeacherListApi } from '../../../api/User/UserApi';
import { getAllBranch } from '../../../api/Branch/BranchApi';
import { ICourseType } from '../../../api/Course/CourseTypes';

const EditCourseInfo: FC<{ data: ICourseType }> = ({ data }) => {
    const { id } = useParams()
    const [branchList, setBranchList] = useState<Array<{ id: string, name: string }>>([])
    const [teacherList, setTeacherList] = useState<ITeacherType[]>([])
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            branch: "meta",
            quota: 0,
            teacher: "",
            startDate: "",
            endDate: ""
        },
        validationSchema: yup.object({
            title: yup.string().required("Bu alan boş bırakılamaz"),
            description: yup.string().required(),
            branch: yup.string().required(),
            startDate: yup
                .date()
                .required()
                .test('start-date', 'Başlangıç tarihi bitiş tarihinden önce olmalıdır', function (value) {
                    const endDate = this.parent.endDate;  // Değişiklik burada
                    return !endDate || value < endDate;
                }),
            endDate: yup
                .date()
                .required()
                .test('end-date', 'Bitiş tarihi başlangıç tarihinden sonra olmalıdır', function (value) {
                    const startDate = this.parent.startDate;  // Değişiklik burada
                    return !startDate || value > startDate;
                }),
            quota: yup.number().min(1).required(),
            teacher: yup.string().required()
        }),
        onSubmit: async (value, { resetForm }) => {
            try {
                const { quota, ...rest } = value
                const response = await updateCourseApi({
                    ...value,
                    courseId: id as string
                })
                toast.success("Kurs Güncellendi", {
                    autoClose: 1000
                })
            }
            catch (err: any) {
                err.response.data.message.forEach((el: any) => {
                    toast.error(el, {
                        autoClose: 1500
                    })
                })

            }

        },

    })


    const changeBranch = (e: any) => {
        if (e.target.value == "") {
            setTeacherList([])
            formik.handleChange(e)
        } else {
            formik.handleChange(e)
            getTeacherListById(e.target.value)
        }
    }

    const getBranchList = async () => {
        try {
            const branches = await getAllBranch()
            setBranchList(branches.data.map(item => {
                return {
                    id: item._id,
                    name: item.name
                }
            }))
        }
        catch (err: any) {
            toast.error(`${err.message}`, {
                autoClose: 1500
            })
        }
    }

    const getTeacherListById = async (id: string) => {
        try {
            const dataList = await getTeacherListApi(id)
            console.log("dataList ==>", dataList)
            setTeacherList(dataList.data)
        }
        catch (err: any) {
            toast.error(err.message, {
                autoClose: 1500
            })
        }
    }


    const detailCourseApiRequest = async () => {
        try {
            let teacherList = await getTeacherListApi(data.branch._id)
            setTeacherList(teacherList.data)
            let startDate = new Date(data.startDate).toISOString().split('T')[0];
            let endDate = new Date(data.endDate).toISOString().split("T")[0]
            formik.setFieldValue("title", data.title)
            formik.setFieldValue("branch", data.branch._id)
            formik.setFieldValue("teacher", data.teacher?._id)
            formik.setFieldValue("quota", data.quota)
            formik.setFieldValue("description", data.description)
            formik.setFieldValue("startDate", startDate)
            formik.setFieldValue("endDate", endDate)
        }
        catch (err: any) {
            console.log("err ==>",err)
            /* navigate("/kurs") */
            toast.error(err.response?.data.message, {
                autoClose: 1500
            })
        }
    }

    useEffect(() => {
        getBranchList()
        detailCourseApiRequest()
    }, [data])
    return (
        <Form onSubmit={formik.handleSubmit} >
            <Row>
                <Col lg={4}>
                    <div className="mb-3">
                        <Label className="form-label">
                            İsim
                        </Label>
                        <Input placeholder='isim' type="text" className="form-control" id="title" name='title'
                            value={formik.values.title} onChange={formik.handleChange} onBlur={formik.handleBlur}
                            invalid={
                                formik.touched.title && formik.errors.title ? true : false
                            }
                        />
                        {formik.touched.title && formik.errors.title ? (
                            <FormFeedback type="invalid"><div>{formik.errors.title}</div></FormFeedback>
                        ) : null}
                    </div>
                </Col>

                <Col lg={4}>
                    <div className="mb-3">
                        <Label className="form-label">
                            Branş
                        </Label>
                        <select className={`form-control ${formik.touched.branch && formik.errors.branch ? 'is-invalid' : ''} `} value={formik.values.branch} onChange={changeBranch} onBlur={formik.handleBlur} name="branch" id="branch">
                            <option value="">
                                Seçim Yapınız
                            </option>
                            {
                                branchList.map((el, index) => {
                                    return (
                                        <option key={`${index}`} value={el.id}  >
                                            {el.name}
                                        </option>
                                    )
                                })
                            }
                        </select>
                        {formik.touched.branch && formik.errors.branch ? (
                            <FormFeedback type="invalid"><div>{formik.errors.branch}</div></FormFeedback>
                        ) : null}
                    </div>
                </Col>
                <Col lg={4}>
                    <div className="mb-3">
                        <Label className="form-label">
                            Eğitmen
                        </Label>
                        <select className={`form-control ${formik.touched.teacher && formik.errors.teacher ? 'is-invalid' : ''} `} value={formik.values.teacher} onChange={formik.handleChange} onBlur={formik.handleBlur} name="teacher" id="teacher">
                            <option value="">
                                Eğitmen Seçiniz
                            </option>
                            {
                                teacherList.map((item, index) => {
                                    return (
                                        <option key={`${index}`} value={item._id}>
                                            {`${item.name} ${item.surname} `}
                                        </option>
                                    )
                                })
                            }
                        </select>
                        {formik.touched.teacher && formik.errors.teacher ? (
                            <FormFeedback type="invalid"><div>{formik.errors.teacher}</div></FormFeedback>
                        ) : null}
                    </div>
                </Col>
                <Col lg={4}>
                    <div className="mb-3">
                        <Label className="form-label">
                            Kontenjan
                        </Label>
                        <Input
                            value={formik.values.quota}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            placeholder='Kontenjan'
                            name='quota'
                            invalid={formik.touched.quota && formik.errors.quota ? true : false}
                            type='number' />
                        {formik.touched.quota && formik.errors.quota ? (
                            <FormFeedback type="invalid"><div>{formik.errors.quota}</div></FormFeedback>
                        ) : null}
                    </div>
                </Col>
                <Col lg={4}>
                    <div className="mb-3">
                        <Label className="form-label">
                            Başlangıç tarihi
                        </Label>

                        <Input
                            name="startDate"
                            type="date"
                            placeholde1r="Başlangıç Tarihi"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.startDate}
                            invalid={
                                formik.touched.startDate && formik.errors.endDate ? true : false
                            }
                        />

                        {formik.touched.startDate && formik.errors.startDate ? (
                            <FormFeedback type="invalid"><div>{formik.errors.startDate}</div></FormFeedback>
                        ) : null}
                    </div>
                </Col>
                <Col lg={4}>
                    <div className="mb-3">
                        <Label className="form-label">
                            Bitiş tarihi
                        </Label>
                        <Input
                            name="endDate"
                            type="date"
                            placeholde1r="Bitiş tarihi"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.endDate}
                            invalid={
                                formik.touched.endDate && formik.errors.endDate ? true : false
                            }
                        />

                        {formik.touched.endDate && formik.errors.endDate ? (
                            <FormFeedback type="invalid"><div>{formik.errors.endDate}</div></FormFeedback>
                        ) : null}
                    </div>
                </Col>
                <Col lg={10}>
                    <div className="mb-3">
                        <Label className="form-label">
                            Açıklama
                        </Label>
                        <Input value={formik.values.description}
                            onBlur={formik.handleBlur}
                            invalid={formik.touched.description && formik.errors.description ? true : false}
                            onChange={formik.handleChange}
                            className="form-control"
                            name='description' id='description' type='textarea'
                            rows={2} style={{ resize: "none" }} />

                        {formik.touched.description && formik.errors.description ? (
                            <FormFeedback type="invalid"><div>{formik.errors.description}</div></FormFeedback>
                        ) : null}
                    </div>
                </Col>
                <Col lg={2}>
                    <div style={{ display: "flex", height: "100%", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <Button style={{ padding: "7px 40px" }} type="submit">
                            Güncelle
                        </Button>
                    </div>
                </Col>
                {/* <Col lg={12}>
        <Nav tabs>
            <NavItem>
                <NavLink
                    className={classNames({ active: activeTab === '1' })}
                    onClick={() => { toggle('1'); }}
                >
                    Fotoğraflar
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                    className={classNames({ active: activeTab === '2' })}
                    onClick={() => { toggle('2'); }}
                >
                    Dökümanlar
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                    className={classNames({ active: activeTab === '3' })}
                    onClick={() => { toggle('3'); }}
                >
                    Öğrenciler
                </NavLink>
            </NavItem>
        </Nav>
        <TabContent activeTab={activeTab} className="tab_content">
            <TabPane tabId="1">
                <Row style={{ marginTop: "20px" }}>
                    <Swiper className="swiper_container" slidesPerView={4} grid={{ rows: 1 }} spaceBetween={30} pagination={{ clickable: true }} modules={[Grid]} >
                        {
                            photoList.map((el) => {
                                return (
                                    <SwiperSlide className="photo_slide">
                                        <div className="photo_section">
                                            <img src={`${import.meta.env.VITE_BASEURL}${el.path}`} className="img-fluid photo_img" alt="" />
                                            <TfiZoomIn className="zoom_icon" />
                                            <div className="card_footer">
                                                <p>
                                                    {el.name.split("-")[0]}
                                                </p>
                                                <Button size="sm" color="danger" className="delete_btn" onClick={() => {
                                                    deletePhoto(el)
                                                }} >
                                                    Sil
                                                </Button>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )
                            })
                        }

                    </Swiper>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "30px" }}>
                        <input ref={photoInputRef} accept='image/png image/jpg image/jpeg' onChange={handleAddCourseImage} style={{ display: "none" }} className='form-control' type='file' multiple />
                        <Button style={{ width: "max-content" }} onClick={() => {
                            photoInputRef.current.click();
                        }}>
                            Fotoğraf Ekle
                        </Button>
                        <p style={{ fontWeight: "bold" }}>
                            Fotoğraf Sayısı : {photoList.length}
                        </p>
                    </div>


                </Row>
            </TabPane>
            <TabPane tabId="2">
                <Row style={{ marginTop: "20px" }}  >

                    <Swiper className="swiper_container" slidesPerView={4} grid={{ rows: 1 }} spaceBetween={30} pagination={{ clickable: true }} modules={[Grid]} >
                        {
                            documentList.map((el) => {
                                return (
                                    <SwiperSlide className="document_slide">
                                        <div className="document_section">
                                            <div className="document_section_container">
                                                <FaRegFilePdf style={{ fontSize: "52px" }} />
                                                <div className="document_section_content">
                                                    <p className="document_name">
                                                        <span>İsim :</span> {el.name.split("-")[0]}
                                                    </p>
                                                    <p className="document_createdBy">
                                                        <span>Oluşturan :</span> {el.createdBy.name + " " + el.createdBy.surname}
                                                    </p>
                                                    <TfiZoomIn className="zoom_icon" />

                                                </div>
                                            </div>
                                            <div className="delete_btn_container">
                                                <p>
                                                    {new Date(el.createdAt).toLocaleDateString()}
                                                </p>
                                                <div>
                                                    <Button size="sm" className="delete_btn" color="primary" style={{ marginRight: "10px" }} onClick={() => {
                                                        openFile(el.path)
                                                    }} >
                                                        İncele
                                                    </Button>
                                                    <Button size="sm" className="delete_btn" color="danger" onClick={() => {
                                                        deleteDocument(el)
                                                    }} >
                                                        Sil
                                                    </Button>
                                                </div>
                                            </div>

                                        </div>
                                    </SwiperSlide>
                                )
                            })
                        }

                    </Swiper>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "30px" }}>
                        <input ref={documetInputRef} accept='application/pdf' onChange={handleAddCourseDocument} style={{ display: "none" }} className='form-control' type='file' multiple />
                        <Button style={{ width: "max-content" }} onClick={() => {
                            documetInputRef.current.click();
                        }}>
                            Döküman Ekle
                        </Button>
                        <p style={{ fontWeight: "bold" }}>
                            Döküman Sayısı : {documentList.length}
                        </p>
                    </div>

                </Row>
            </TabPane>
        </TabContent>
    </Col> */}


            </Row>

        </Form>
    )
}

export default EditCourseInfo