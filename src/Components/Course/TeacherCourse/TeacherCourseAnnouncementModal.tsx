import { useFormik } from 'formik'
import React, { FC, useEffect, useState } from 'react'
import { Button, FormFeedback, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import * as yup from "yup"
import { createAnnouncementApi, updateAnnouncementApi } from '../../../api/Course/courseApi'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'


const TeacherCourseAnnouncementModal: FC<{ initialData?: { content?: string, title?: string, announcementId?: string }, courseId: string, modalShow: boolean, setModalShow: Function, process: Function }> = ({ modalShow, setModalShow, courseId, process, initialData }) => {
    const { id } = useParams()
    const formik = useFormik({
        initialValues: {
            content: "",
            title: ""
        },
        validationSchema: yup.object({
            content: yup.string().required().min(5).max(200),
            title: yup.string().required().min(3).max(50)
        }),
        onSubmit: async (value, { resetForm }) => {
            try {
                if (!initialData) {
                    const response = await createAnnouncementApi({
                        ...value,
                        courseId
                    })
                    console.log("response ==>", response)
                    process(response.data)
                    toast.success("Duyuru kaydedildi", {
                        autoClose: 1000
                    })
                    setModalShow(false)
                }
                else {
                    const response = await updateAnnouncementApi({
                        content: value.content,
                        title: value.title,
                        courseId: id as string,
                        announcementId: initialData.announcementId as string
                    })
                    process(response.data)
                    toast.success("Duyuru güncellendi", {
                        autoClose: 1000
                    })
                    setModalShow(false)
                }
            }
            catch (err) {

            }
        }
    })

    useEffect(() => {
        if (initialData) {
            formik.setFieldValue("title", initialData.title)
            formik.setFieldValue("content", initialData.content)
        }
        else {
            formik.setFieldValue("title", "")
            formik.setFieldValue("content", "")
        }

    }, [initialData])

    return (
        <Modal isOpen={modalShow}>
            <ModalHeader>
                <h6>
                    {initialData ? "Duyuru Güncelle" : "Duyuru Ekle"}
                </h6>
            </ModalHeader>
            <ModalBody>
                <div className="mb-3">
                    <Label className="form-label">
                        Başlık
                    </Label>
                    <Input
                        placeholder='başlık'
                        name="title"
                        type="text"
                        placeholde1r="Bitiş tarihi"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.title}
                        invalid={
                            formik.touched.title && formik.errors.title ? true : false
                        }
                    />

                    {formik.touched.title && formik.errors.title ? (
                        <FormFeedback type="invalid"><div>{formik.errors.title}</div></FormFeedback>
                    ) : null}
                </div>
                <div className="mb-3">
                    <Label className="form-label">
                        Açıklama
                    </Label>
                    <Input value={formik.values.content}
                        onBlur={formik.handleBlur}
                        invalid={formik.touched.content && formik.errors.content ? true : false}
                        onChange={formik.handleChange}
                        className="form-control"
                        name="content" id='content' type='textarea'
                        rows={2} style={{ resize: "none" }} />

                    {formik.touched.content && formik.errors.content ? (
                        <FormFeedback type="invalid"><div>{formik.errors.content}</div></FormFeedback>
                    ) : null}
                </div>
            </ModalBody>
            <ModalFooter>
                <Button className='btn btn-success' onClick={() => {
                    formik.handleSubmit()
                }}>
                    {initialData ? "Güncelle" : "Kaydet"}
                </Button>
                <Button className='btn btn-danger' onClick={() => {
                    setModalShow(false)
                }}>
                    İptal
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default TeacherCourseAnnouncementModal