import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "swiper/css/effect-flip";
import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import { FaRegFilePdf } from 'react-icons/fa';
import { LuFileJson } from 'react-icons/lu';
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import { Grid } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IFiles } from '../../../api/Course/CourseTypes';
import { addDocumentApi, deleteDocumentApi } from '../../../api/Course/courseApi';
import { toast } from 'react-toastify';

const CourseDocumentModal: FC<{ courseId?: string, modalShow: boolean, setModalShow: Function, documents: Array<any>, editMode?: boolean }> = ({ modalShow, setModalShow, documents, editMode = false, courseId }) => {
    const documetInputRef = useRef<any>(null)
    const [documentList, setDocumentList] = useState<Array<any>>([])
    const openFile = (path: any) => {
        const fullFilePath = `${import.meta.env.VITE_BASEURL}${path}`;
        window.open(fullFilePath, '_blank');
    };

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
                    formData.append("id", courseId as string)
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

    const extensionIcon = (ext: string) => {
        console.log("ext ==>", ext)
        if (ext == ".pdf") {
            return <FaRegFilePdf style={{ fontSize: "22px", marginRight: "10px" }} />
        }
        else if (ext == ".json") {
            return <LuFileJson style={{ fontSize: "30px" }} />
        }
    }
    const deleteDocument = async (item: IFiles) => {
        try {
            await deleteDocumentApi({
                courseId: courseId as string,
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

    useEffect(() => {
        setDocumentList(documents)
    }, [documents])

    return (
        <>
            <Modal isOpen={modalShow} size='lg' style={{ height: "max-content" }}  >
                <ModalHeader >
                    <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                        <h5>
                            Dökümanlar
                        </h5>
                        {
                            editMode && (
                                <Button size='sm' onClick={() => {
                                    documetInputRef.current.click()
                                }} >
                                    Döküman Ekle
                                </Button>
                            )
                        }
                    </div>
                </ModalHeader>
                <ModalBody>
                    <Row>
                        {
                            documentList?.length !== 0 ? (
                                <Swiper breakpoints={{
                                    576: {
                                        width: 576,
                                        slidesPerView: 2,
                                    },
                                    768: {
                                        width: 768,
                                        slidesPerView: 3,
                                    },
                                }} className='' slidesPerView={1} spaceBetween={30} grid={{ rows: 1 }} pagination={{ clickable: true }} modules={[Grid]} >
                                    {
                                        documentList?.map((el, index) => {
                                            return (
                                                <SwiperSlide key={`${index}`} >
                                                    <div className='document_modal_card_container' >
                                                        <div className='document_modal_card_container_content' style={editMode ? { borderBottom: "1px solid gray" } : { cursor: "pointer" }} onClick={() => {

                                                        }}>
                                                            <FaRegFilePdf style={{ fontSize: "25px" }} />

                                                            <p className="document_name">
                                                                {el.name.split("-")[0]}
                                                            </p>

                                                        </div>
                                                        {
                                                            editMode && (
                                                                <div className="delete_btn_container">

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
                                                            )
                                                        }

                                                    </div>
                                                </SwiperSlide>
                                            )
                                        })
                                    }

                                </Swiper>
                            ) : (
                                <div style={{ display: "flex", justifyContent: "start" }} >
                                    <h5 style={{ textTransform: "capitalize" }}>
                                        herhangi bir döküman yok
                                    </h5>
                                </div>
                            )
                        }
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                        <p>
                            <span>Döküman Sayısı :</span> <strong>{documentList.length}</strong>
                        </p>

                        <Button className='btn btn-danger' onClick={() => {
                            setModalShow(false)
                        }} >
                            Kapat
                        </Button>
                    </div>
                </ModalFooter>
            </Modal>

            < input ref={documetInputRef} accept='application/pdf' onChange={handleAddCourseDocument} style={{ display: "none" }
            } className='form-control' type='file' multiple />
        </>
    )
}

export default CourseDocumentModal