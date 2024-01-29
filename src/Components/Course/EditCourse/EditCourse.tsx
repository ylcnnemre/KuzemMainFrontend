import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "swiper/css/effect-flip";

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Button, Col, Form, FormFeedback, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { IUser } from '../../../api/User/UserType';
import { useFormik } from 'formik';
import * as yup from "yup"
import { toast } from 'react-toastify';
import { addPhotoApi, createCourseApi, deletePhotoApi, getDetailCourseApi } from '../../../api/Course/courseApi';
import { getAllBranch } from '../../../api/Branch/BranchApi';
import { getTeacherListApi } from '../../../api/User/UserApi';
import { FaRegFilePdf } from 'react-icons/fa';
import { LuFileJson2 } from 'react-icons/lu';
import { useParams } from 'react-router-dom';
import { ICourseType } from '../../../api/Course/CourseTypes';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

const EditCourse = () => {
    const [branchList, setBranchList] = useState<Array<{ id: string, name: string }>>([])
    const [teacherList, setTeacherList] = useState<IUser[]>([])
    const [modal_standard, setmodal_standard] = useState(false);
    const [photoList, setPhotoList] = useState<string[]>([])
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0)
    const [documentList, setDocumentList] = useState<string[]>([])
    const { id } = useParams()
    const fileInputRef = useRef<any>(null);


    const handleAddCourseImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray: File[] = Array.from(e.target.files);
            const formData = new FormData()
            formData.append("id", id as string)
            filesArray.forEach(item => {
                formData.append("files[]", item)
            })

            let response = await addPhotoApi(formData)
            setPhotoList(response.data)
            console.log("response ==>", response)
            console.log("photoList ==>", photoList)
        }
    }

    /*     const handleCourseImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
                const filesArray: File[] = Array.from(e.target.files);
                setSelectedFiles(filesArray);
            }
        };
    
        const handleCourseDocument = (e: any) => {
            console.log("eee==>", e.target.files)
            if (e.target.files) {
                const filesArray: File[] = Array.from(e.target.files)
                setSelectedDocumentFiles(filesArray)
            }
        }
     */

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

    const extensionIcon = (mimeType: string) => {
        if (mimeType == "application/pdf") {
            return <FaRegFilePdf style={{ fontSize: "30px" }} />
        }
        else if (mimeType == "application/json") {
            return <LuFileJson2 style={{ fontSize: "30px" }} />
        }
    }

    const detailCourseApiRequest = async () => {
        try {
            const response = await getDetailCourseApi(id ?? "")
            let teacherList = await getTeacherListApi(response.data.branch._id)
            console.log("responeData ==>", response.data)
            setPhotoList(response.data.photos)
            setDocumentList(response.data.documents)
            setTeacherList(teacherList.data)
            let startDate = new Date(response.data.startDate).toISOString().split('T')[0];
            let endDate = new Date(response.data.endDate).toISOString().split("T")[0]
            formik.setFieldValue("title", response.data.title)
            formik.setFieldValue("branch", response.data.branch._id)
            formik.setFieldValue("teacher", response.data.teacher._id)
            formik.setFieldValue("quota", response.data.quota)
            formik.setFieldValue("description", response.data.description)
            formik.setFieldValue("startDate", startDate)
            formik.setFieldValue("endDate", endDate)
        }
        catch (err) {

        }

    }


    useEffect(() => {
        getBranchList()
        detailCourseApiRequest()
    }, [])


    const photoName = useMemo(() => {
        let photo = photoList[selectedPhotoIndex]?.split("/uploads/course/")[1].split("-")[0]
        return photo
    }, [photoList, selectedPhotoIndex])


    const deletePhoto = async () => {
        try {
            let formatPhotoName = photoList[selectedPhotoIndex].split("/uploads/course/")[1]
            let data = await deletePhotoApi({
                id: id as string,
                imgName: formatPhotoName
            })
            toast.success("Dosya başarı ile silindi", {
                autoClose: 1500
            })
            setPhotoList(photoList.filter(el => el !== photoList[selectedPhotoIndex]))
        }
        catch (err: any) {
            toast.error(err.message, {
                autoClose: 1500
            })
        }
    }


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
                <Col lg={12}>
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
                <Col lg={5} >
                    <div className="mb-3">
                        <Label className="form-label">
                            Fotoğraflar
                        </Label>

                        <Button color='warning' onClick={() => { setmodal_standard(!modal_standard) }} style={{ padding: "5px 40px", marginLeft: "30px" }} >
                            Görüntüle ({photoList.length})
                        </Button>
                        <input ref={fileInputRef} accept='image/png image/jpg image/jpeg' onChange={handleAddCourseImage} style={{ display: "none" }} className='form-control' type='file' multiple />
                        <Button color='success' style={{ padding: "5px 40px", marginLeft: "30px" }} onClick={() => {
                            console.log("asd =>", fileInputRef.current)
                            fileInputRef.current.click();
                        }} >
                            Fotoğraf Ekle
                        </Button>
                        <Modal id="myModal"
                            isOpen={modal_standard}
                            toggle={() => {
                                setmodal_standard(!modal_standard)
                            }}
                            style={{ maxWidth: "600px", width: "100%" }}
                        >
                            <ModalHeader>
                                <h5
                                    className="modal-title"
                                    id="myModalLabel"
                                >
                                    Fotoğraflar
                                </h5>

                            </ModalHeader>
                            <ModalBody>
                                <Row>
                                    <Col sm={12}>
                                        <Swiper onSlideChange={(e) => {
                                            setSelectedPhotoIndex(e.activeIndex)
                                        }} pagination={{ type: "fraction", clickable: true }} modules={[Pagination, Navigation]} loop={false} className="mySwiper swiper pagination-fraction-swiper rounded" >
                                            <div className="swiper-wrapper">
                                                {
                                                    photoList.map(item => {
                                                        return (
                                                            <SwiperSlide><img src={`${import.meta.env.VITE_BASEURL}${item}`} alt="" className="img-fluid w-100 " /></SwiperSlide>
                                                        )
                                                    })
                                                }

                                            </div>
                                        </Swiper>
                                    </Col>

                                    <Col sm={12}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px" }}>
                                            <p>
                                                {photoName}
                                            </p>
                                            <Button color="danger" size="sm" style={{ padding: "5px 40px" }} onClick={() => {
                                                deletePhoto()
                                            }} >
                                                Sil
                                            </Button>
                                        </div>

                                    </Col>
                                </Row>
                            </ModalBody>

                        </Modal>
                    </div>
                </Col>
                <Col lg={5}>
                    <div className='mb-3'>
                        <Label className="form-label">
                            Dökümanlar
                        </Label>
                        <Button color='warning' onClick={() => { setmodal_standard(!modal_standard) }} style={{ padding: "5px 40px", marginLeft: "30px" }} >
                            Görüntüle ({documentList.length})
                        </Button>
                    </div>
                </Col>
                <Col lg={2}>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button style={{ padding: "7px 40px" }}>
                            Onayla
                        </Button>
                    </div>
                </Col>

            </Row>

        </Form>
    )
}

export default EditCourse


