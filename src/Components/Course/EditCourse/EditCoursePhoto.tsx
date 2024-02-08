import React, { FC, useRef } from 'react'
import "./index.scss"
import { TfiZoomIn } from 'react-icons/tfi';
import { Button, Row } from 'reactstrap'
import { Swiper, SwiperSlide } from 'swiper/react'
import { IFiles } from '../../../api/Course/CourseTypes';
import { addPhotoApi, deletePhotoApi } from '../../../api/Course/courseApi';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Grid } from 'swiper/modules';

const EditCoursePhoto: FC<{ photoList: any[], setPhotoList: Function }> = ({ photoList, setPhotoList }) => {
    const photoInputRef = useRef<any>(null);
    const { id } = useParams()
    const deletePhoto = async (item: IFiles) => {
        try {
            await deletePhotoApi({
                courseId: id as string,
                imgName: item.name,
                imgId: item._id
            })
            toast.success("Fotoğraf başarıyla silindi", {
                autoClose: 1000
            })
            setPhotoList(photoList.filter(el => el.name !== item.name))
        }
        catch (err: any) {
            toast.error(err.message, {
                autoClose: 1500
            })
        }
    }

    const handleAddCourseImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            try {
                const filesArray: File[] = Array.from(e.target.files);
                const formData = new FormData()
                formData.append("id", id as string)
                filesArray.forEach(item => {
                    formData.append("files[]", item)
                })
                let response = await addPhotoApi(formData)
                setPhotoList([...response.data.files.filter(el => el.type == "photo").reverse()])
            }
            catch (err: any) {
                console.log("err ==>", err.message)
            }
        }
    }

    return (
        <Row style={{ marginTop: "20px" }}>
            <Swiper className="swiper_container" slidesPerView={3} grid={{ rows: 1 }} spaceBetween={30} pagination={{ clickable: true }} modules={[Grid]} >
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
    )
}

export default EditCoursePhoto