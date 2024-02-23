import { useFormik } from 'formik'
import React, { FC, useState } from 'react'
import { Button, FormFeedback, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import * as yup from "yup"
import { createAnnouncementApi } from '../../../api/Course/courseApi'
const TeacherCourseAnnouncementModal: FC<{ courseId: string, modalShow: boolean, setModalShow: Function }> = ({ modalShow, setModalShow, courseId }) => {

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
                const response = await createAnnouncementApi({
                    ...value,
                    courseId
                })
                
                
            }
            catch (err) {

            }
        }
    })


    return (
        <Modal isOpen={modalShow}>
            <ModalHeader>
                <h6>
                    Duyuru Ekle
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
                    Kaydet
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