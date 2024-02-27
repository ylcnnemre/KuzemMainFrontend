import React, { FC, useState } from 'react'
import { FaRegFilePdf } from 'react-icons/fa';
import { LuFileJson } from 'react-icons/lu';
import { Button, Input, Label } from 'reactstrap'
import { Grid } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { createCourseApi } from '../../../api/Course/courseApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { IProgram } from './AddCourseForm';

const AddCourseDocumentTab: FC<{ programList: IProgram[], setCurrent: any, handleCourseDocument: any, selectedDocumentFiles: any[], formik: any, selectedImageFiles: any[] }> = ({ handleCourseDocument, selectedDocumentFiles, formik, selectedImageFiles, setCurrent, programList }) => {

  const navigate = useNavigate()
  const extensionIcon = (mimeType: string) => {
    if (mimeType == "application/pdf") {
      return <FaRegFilePdf style={{ fontSize: "30px", marginRight: "10px" }} />
    }
    else if (mimeType == "application/json") {
      return <LuFileJson style={{ fontSize: "30px" }} />
    }
  }

  const saveCourse = async () => {
    const value = formik.values
    console.log("valea =>", formik.values)
    const formData = new FormData()
    Object.entries(value).map(([key, val]) => {
      const data: any = val
      formData.append(key, data)
    })

    selectedImageFiles.forEach((item, index) => {
      formData.append(`files[]`, item, `courseImage-ctype-${item.name}`)
    })

    selectedDocumentFiles.forEach((item, index) => {
      formData.append("files[]", item, `courseDocument-ctype-${item.name}`)
    })
    formData.append("program", JSON.stringify(programList));


    console.log("formData ==>=", formData.get("program"))
    try {
      let response = await createCourseApi(formData)
      toast.success(response.data.msg, {
        autoClose: 1500
      })
      formik.resetForm()
      navigate("/kurs")
    }
    catch (err: any) {
      toast.error(err.response.data.message, {
        autoClose: 1500
      })
    }

  }


  return (
    <div className="add_course_document">

      <Input onChange={handleCourseDocument} className='form-control' type='file' multiple />
      <Swiper className="swiper_add_course_container" slidesPerView={4} grid={{ rows: 1 }} spaceBetween={5} pagination={{ clickable: true }} modules={[Grid]} >
        {
          selectedDocumentFiles.map((file, index) => {
            return (
              <SwiperSlide className="document_slide">
                <div style={{ display: "flex", alignItems: "center" }}>
                  {extensionIcon(file.type)}
                  <p style={{ marginBottom: 0, height: "max-content" }}>
                    {file.name}
                  </p>
                </div>
              </SwiperSlide>
            )
          })
        }
      </Swiper>
      <div className='add_course_document_bottom'>
        <Button onClick={() => {
          setCurrent(2)
        }} className='btn btn-warning'>
          Geri
        </Button>
        <Button onClick={saveCourse}>
          Kursu Onayla
        </Button>
      </div>
    </div>
  )
}

export default AddCourseDocumentTab