
import React, { FC, useEffect, useMemo, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Row, Col, Label } from 'reactstrap';
import Select from "react-select"
import { useFormik } from 'formik';
import * as yup from "yup"
import { createSemesterApi, updateSemesterApi } from '../../api/Semester/SemesterApi';
import { toast } from 'react-toastify';
import { ISemester } from '../../api/Semester/SemesterType';

const SemesterSaveModal: FC<{ showModal: boolean, setShowModal: Function, editMode: boolean, editData?: ISemester, setSemesterData: React.Dispatch<React.SetStateAction<ISemester[]>> }> = ({ showModal, setShowModal, editMode = false, editData, setSemesterData, ...args }) => {
    enum periodType {
        spring = "bahar",
        summer = "yaz",
        winter = "kış",
        autumn = "güz"
    }
    const period = useMemo(() => {
        return [{
            label: "bahar",
            value: periodType.spring
        }, {
            label: "yaz",
            value: periodType.summer
        }, {
            label: "kış",
            value: periodType.winter
        }, {
            label: "güz",
            value: periodType.autumn
        }]
    }, [])

    const nowYear = useMemo(() => {
        const result: { label: string, value: any }[] = []
        let year = new Date().getFullYear()
        for (let i = 0; i < 10; i++) {
            result.push({
                label: (year + i).toString(),
                value: year + i
            })
        }
        return result
    }, [])

    const toggle = () => setShowModal(false);

    const formik = useFormik({
        initialValues: {
            id: "",
            name: "",
            description: "",
            period: {
                label: "bahar",
                value: periodType.spring
            },
            year: {
                label: new Date().getFullYear().toString(),
                value: new Date().getFullYear()
            },
            active: {
                label: "aktif",
                value: true
            }
        },
        validationSchema: yup.object({
            name: yup.string().required(),
            description: yup.string().required()
        }),
        onSubmit: async (value, { resetForm }) => {
            try {
                if (!editMode) {
                    const { active, year, period, id, ...rest } = value
                    const requestData = {
                        ...rest,
                        active: active.value,
                        year: year.value,
                        period: period.value
                    }
                    const response = await createSemesterApi(requestData)
                    toast.success("Kayıt işlemi başarılı", {
                        autoClose: 1000
                    })
                    setSemesterData((data) => {
                        return [...data, response.data]
                    })
                    resetForm()
                }
                else {
                    const { active, year, period, ...rest } = value
                    const requestData = {
                        ...rest,
                        active: active.value,
                        year: year.value,
                        period: period.value
                    }
                    let response = await updateSemesterApi(requestData)

                    setSemesterData((data) => {
                        return data.map(el => {
                            if (el._id == value.id) {
                                return {
                                    ...response.data
                                }
                            }
                            return el
                        })
                    })
                    toggle()
                    toast.success("güncelleme başarılı", {
                        autoClose: 1000
                    })
                }
            }
            catch (err: any) {
                const { active, year, period, id, ...rest } = value
                toast.error(err.response.data.message, {
                    autoClose: 1000
                })
            }
        }
    })


    useEffect(() => {
        if (editMode) {
            console.log("editData ==>", editData)
            formik.setFieldValue("name", editData?.name)
            formik.setFieldValue("description", editData?.description)
            formik.setFieldValue("year", {
                label: editData?.year,
                value: editData?.year
            })
            formik.setFieldValue("period", {
                label: editData?.period,
                value: editData?.period
            })
            formik.setFieldValue("active", editData?.active ? { label: "aktif", value: true } : { label: "pasif", value: false })
            formik.setFieldValue("id", editData?._id)
        }
        else {
            formik.resetForm()
        }
    }, [editMode, editData])

    return (
        <Modal isOpen={showModal} toggle={toggle} {...args}>
            <ModalHeader toggle={toggle}>
                {editMode ? "Dönem Güncelle" : "Dönem Ekle"}
            </ModalHeader>
            <ModalBody>
                <Row>
                    <Col lg={6} className='mb-3' >
                        <Label htmlFor="name" className="form-label">
                            İsim*
                        </Label>
                        <Input value={formik.values.name} style={formik.errors.name && formik.touched.name ? { borderColor: "#EE6352" } : {}} name='name' placeholder='isim' onChange={(e) => {
                            formik.setFieldValue("name", e.target.value)
                        }} />
                    </Col>
                    <Col lg={6}>
                        <Label htmlFor="period" className="form-label">
                            Dönem
                        </Label>
                        <Select
                            name='period'
                            value={formik.values.period}
                            options={period}
                            classNamePrefix="select"
                            onChange={(e) => {
                                formik.setFieldValue("period", e)
                            }}
                        />
                    </Col>
                    <Col lg={6} className='mb-3'>
                        <Label htmlFor="year" className="form-label">
                            Yıl
                        </Label>
                        <Select
                            name='year'
                            value={formik.values.year}
                            options={nowYear}
                            classNamePrefix="select"
                            onChange={(e) => {
                                console.log("ee ==>", e)
                                formik.setFieldValue("year", e)
                            }}
                        />
                    </Col>
                    <Col lg={6} className='mb-3'>
                        <Label htmlFor="year" className="form-label">
                            Durum
                        </Label>
                        <Select
                            name='active'
                            value={formik.values.active}

                            options={[{
                                label: "aktif",
                                value: true
                            }, {
                                label: "pasif",
                                value: false
                            }]}
                            classNamePrefix="select"
                            onChange={(e) => {
                                formik.setFieldValue("active", e)
                            }}
                        />
                    </Col>
                    <Col lg={12}>
                        <Label htmlFor="description" className="form-label">
                            Açıklama*
                        </Label>

                        <Input value={formik.values.description} type='textarea' rows={2} style={formik.errors.description && formik.touched.description ? { resize: "none", borderColor: "#EE6352" } : { resize: "none" }} onChange={(e) => {
                            formik.setFieldValue("description", e.target.value)
                        }} />
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button color={editMode ? "warning" : "secondary"} onClick={() => {
                    formik.handleSubmit()
                }}>
                    {editMode ? "Güncelle" : "Ekle"}
                </Button>{' '}
                <Button color="danger" onClick={toggle}>
                    İptal
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default SemesterSaveModal