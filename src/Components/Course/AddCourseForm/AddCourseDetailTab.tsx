import { useFormik } from 'formik'
import React, { FC, useEffect, useMemo, useState } from 'react'
import { Button, Col, Form, FormFeedback, Input, Label, Nav, Row, TabContent, TabPane } from 'reactstrap'
import * as yup from "yup"
import { getAllBranch } from '../../../api/Branch/BranchApi'
import { toast } from 'react-toastify'
import { getTeacherListApi } from '../../../api/User/UserApi'
import { createCourseApi } from '../../../api/Course/courseApi'
import { FaRegFilePdf } from "react-icons/fa";
import { LuFileJson } from "react-icons/lu";
import "./index.scss"
import { ITeacherType } from '../../../api/User/Teacher/teacherType'
import { getAllSemesterApi } from '../../../api/Semester/SemesterApi'
import { ISemester } from '../../../api/Semester/SemesterType'
import { TimePicker } from 'antd'
import dayjs from 'dayjs';
import moment from 'moment';


const AddCourseDetailTab: FC<{ formik: any, setCurrent?: any }> = ({ formik }) => {
    const [branchList, setBranchList] = useState<Array<{ id: string, name: string }>>([])
    const [teacherList, setTeacherList] = useState<ITeacherType[]>([])
    const [semesterList, setSemesterList] = useState<ISemester[]>([])

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



    const getSemesterAll = async () => {
        try {
            const response = await getAllSemesterApi()
            setSemesterList(response.data)
        }
        catch (err) {

        }
    }

    const dayList = useMemo(() => {
        return ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"]
    }, [])


    useEffect(() => {
        getBranchList()
        getSemesterAll()
    }, [])
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
                <Col lg={6}>
                    <div className="mb-3">
                        <Label className="form-label">
                            Açıklama
                        </Label>
                        <Input value={formik.values.description}
                            onBlur={formik.handleBlur}
                            invalid={formik.touched.startDate && formik.errors.endDate ? true : false}
                            onChange={formik.handleChange}
                            name='description' id='description' type='textarea'
                            rows={2} style={{ resize: "none" }} />

                        {formik.touched.description && formik.errors.description ? (
                            <FormFeedback type="invalid"><div>{formik.errors.description}</div></FormFeedback>
                        ) : null}
                    </div>
                </Col>
                <Col lg={3}>
                    <div className="mb-3">
                        <Label className="form-label">
                            Dönem
                        </Label>
                        <select onChange={formik.handleChange} className={`form-control ${formik.touched.semester && formik.errors.semester ? 'is-invalid' : ''} `} value={formik.values.semester} onBlur={formik.handleBlur} name="semester" id="semester">
                            <option value="">
                                Seçim Yapınız
                            </option>
                            {
                                semesterList.map((el, index) => {
                                    return (
                                        <option key={`${index}`} value={el._id}  >
                                            {el.name}
                                        </option>
                                    )
                                })
                            }
                        </select>
                        {formik.touched.semester && formik.errors.semester ? (
                            <FormFeedback type="invalid"><div>{formik.errors.semester}</div></FormFeedback>
                        ) : null}
                    </div>
                </Col>
                <Col lg={3}>
                    <div className="mb-3">
                        <Label className="form-label">
                            Aktiflik
                        </Label>
                        <select onChange={formik.handleChange} className={`form-control ${formik.touched.active && formik.errors.active ? 'is-invalid' : ''} `} value={formik.values.active} onBlur={formik.handleBlur} name="active" id="active">
                            <option value="">
                                Seçim Yapınız
                            </option>
                            {
                                ["aktif", "pasif"].map((el, index) => {
                                    return (
                                        <option value={el} key={`${index}`} >
                                            {el}
                                        </option>
                                    )
                                })

                            }
                        </select>
                        {formik.touched.active && formik.errors.active ? (
                            <FormFeedback type="invalid"><div>{formik.errors.active}</div></FormFeedback>
                        ) : null}
                    </div>
                </Col>


                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
                    <Button style={{ padding: "7px 40px" }}>
                        İlerle
                    </Button>
                </div>
            </Row>

        </Form>
    )
}

export default AddCourseDetailTab