import React, { FC, useRef } from 'react'
import { FaRegFilePdf } from 'react-icons/fa'
import { TfiZoomIn } from 'react-icons/tfi'
import { Button, Row } from 'reactstrap'
import { Swiper, SwiperSlide } from 'swiper/react'
import { addDocumentApi, deleteDocumentApi } from '../../../api/Course/courseApi'
import { ICourseType, IFiles } from '../../../api/Course/CourseTypes'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Grid } from 'swiper/modules'

const EditCourseDocumentTab: FC<{ documentList: ICourseType["files"], setDocumentList: Function }> = ({ documentList, setDocumentList }) => {
    const { id } = useParams()
    const documetInputRef = useRef<any>(null)
    const openFile = (path: any) => {
        const fullFilePath = `${import.meta.env.VITE_BASEURL}${path}`;
        window.open(fullFilePath, '_blank');
    };
    const deleteDocument = async (item: IFiles) => {
        try {

            await deleteDocumentApi({
                courseId: id as string,
                documentId: item._id,
                documentName: item.name
            })
            toast.success("Döküman başarı ile silindi", {
                autoClose: 1000
            })
            setDocumentList(documentList.filter(el => el.name !== item.name))
        }
        catch (err: any) {
            toast.error(err.message, {
                autoClose: 1500
            })
        }
    }


    const handleAddCourseDocument = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            try {
                const arr = Array.from(e.target.files)
                let control: boolean = false
                const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
                const maxSize = 10 * 1024 * 1024 // 10 MB

                arr.forEach(el => {
                    if (!allowedTypes.includes(el.type)) {
                        toast.error("Sadece PDF veya Word dosyaları yükleyebilirsiniz.", {
                            autoClose: 3000
                        })
                        control = true
                        return
                    }

                    if (el.size > maxSize) {
                        toast.error("Dosya boyutu 10 MB'ı geçemez.", {
                            autoClose: 3000
                        })
                        control = true
                        return
                    }
                })
                if (!control) {
                    const filesArray: File[] = Array.from(e.target.files);
                    const formData = new FormData()
                    formData.append("id", id as string)
                    filesArray.forEach(item => {
                        formData.append("files[]", item)
                    })
                    let response = await addDocumentApi(formData)
                    setDocumentList([...response.data.files.filter(el => el.type == "document").reverse()])
                }

            }
            catch (err: any) {
                toast.error(err.response.data.message, {
                    autoClose: 1000
                })
            }
        }
    }

    return (
        <Row style={{ marginTop: "20px" }}  >

            <Swiper className="swiper_container" slidesPerView={3} grid={{ rows: 1 }} spaceBetween={30} pagination={{ clickable: true }} modules={[Grid]} >
                {
                    documentList.map((el, index) => {
                        return (
                            <SwiperSlide key={`${index}`} className="document_slide">
                                <div className="document_section">
                                    <div className="document_section_container">
                                        <FaRegFilePdf style={{ fontSize: "52px" }} />
                                        <div className="document_section_content">
                                            <p className="document_name">
                                                <span>İsim :</span> {el.name.split("-")[0]}
                                            </p>
                                            <p className="document_createdBy">
                                                <span>Oluşturan :</span> {el.createdBy?.name + " " + el.createdBy?.surname}
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
    )
}

export default EditCourseDocumentTab