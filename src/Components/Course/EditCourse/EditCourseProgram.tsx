import { TimePicker } from 'antd'
import React, { FC, useMemo, useState } from 'react'
import { CgClose } from 'react-icons/cg'
import { Button, Col, Label, Row } from 'reactstrap'
import { IProgram } from '../AddCourseForm/AddCourseForm'
import { ICourseType } from '../../../api/Course/CourseTypes'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'
import { updateCourseProgramApi } from '../../../api/Course/courseApi'
import { useParams } from 'react-router-dom'

const EditCourseProgram: FC<{ programList: ICourseType["schedules"], setProgramList: Function }> = ({ programList, setProgramList }) => {
    const { id } = useParams()
    const [selectedProgramData, setSelectedProgramData] = useState<{ id: string, day: string, startTime: string, endTime: string }>({
        day: "Pazartesi",
        endTime: "12:30",
        startTime: "12:00",
        id: ""
    })

    const dayList = useMemo(() => {
        return ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"]
    }, [])
    const format: string = 'HH:mm'

    const addProgram = () => {
        const control = compareHour(selectedProgramData.startTime, selectedProgramData.endTime)
        if (!control) {
            toast.error("bitiş saati başlangıçtan önce olamaz", {
                autoClose: 1500
            })
        } else {
            setProgramList([
                ...programList,
                {
                    ...selectedProgramData,
                    id: Math.random().toString()
                }
            ])
        }
    }

    const compareHour = (time1: string, time2: string) => {
        var [saat1, dakika1] = time1.split(':').map(Number);
        var [saat2, dakika2] = time2.split(':').map(Number);

        // Saatleri ve dakikaları karşılaştır
        if (saat1 < saat2) {
            return true;
        } else if (saat1 > saat2) {
            return false;
        } else {
            if (dakika1 < dakika2) {
                return true;
            } else if (dakika1 > dakika2) {
                return false;
            } else {
                return false; // Zamanlar eşit
            }
        }
    }

    const confirmProgram = async () => {
        try {
            if (programList.length == 0) {
                toast.warning("en az bir gün seçiniz", {
                    autoClose: 1000
                })
            }
            else {
                const response = await updateCourseProgramApi({
                    courseId: id as string,
                    programs: programList.map(el => {
                        return {
                            day: el.day,
                            endTime: el.endTime,
                            startTime: el.startTime
                        }
                    })
                })
                toast.success("Program kayıt edildi", {
                    autoClose: 1000
                })
            }


        }
        catch (err: any) {
            toast.error(err.message, {
                autoClose: 1000
            })
        }
    }


    console.log("prog =>", programList)

    return (
        <Row>
            <Col lg={3} >
                <div className="mb-3">
                    <Label className="form-label">
                        Gün
                    </Label>
                    <select className={`form-control`} onChange={(e) => {
                        setSelectedProgramData({
                            ...selectedProgramData,
                            day: e.target.value,
                        })
                    }} >
                        {
                            dayList.map((el, index) => {
                                return (
                                    <option key={`${index}`} value={el}  >
                                        {el}
                                    </option>
                                )
                            })
                        }
                    </select>

                </div>
            </Col>
            <Col lg={3} >
                <div className="mb-3">
                    <Label className="form-label">
                        Başlangıç Saati
                    </Label>
                    <div>
                        <TimePicker allowClear={false}
                            onChange={(e) => {
                                setSelectedProgramData({
                                    ...selectedProgramData,
                                    startTime: `${e.hour()}:${e.minute().toString().padStart(2, "0")}`
                                })
                            }}

                            value={dayjs(selectedProgramData.startTime, format)} className='custom-time-picker' format={format} />
                    </div>


                </div>
            </Col>
            <Col lg={3} >
                <div className="">
                    <Label className="form-label">
                        Bitiş Saati
                    </Label>
                    <div>
                        <TimePicker className='custom-time-picker' onChange={(e) => {
                            setSelectedProgramData({
                                ...selectedProgramData,
                                endTime: `${e.hour()}:${e.minute().toString().padStart(2, "0")}`
                            })

                        }} value={dayjs(selectedProgramData.endTime, format)} allowClear={false} format={format} />
                    </div>


                </div>
            </Col>
            <Col lg={3} >
                <div className="">
                    <Label className="form-label">

                    </Label>
                    <div style={{ transform: "translateY(20%)" }}>
                        <Button className='px-2 me-3 btn btn-warning' onClick={() => {
                            addProgram()
                        }}  >
                            Program Ekle
                        </Button>
                        <Button className='px-2  btn btn-' onClick={() => {
                            confirmProgram()
                        }}  >
                            Programı Onayla
                        </Button>
                    </div>


                </div>
            </Col>
            <Col lg={12} style={{ marginTop: "30px", marginBottom: "30px" }} >
                <Row>
                    {
                        programList.map((el, index) => {
                            return (
                                <Col key={`${index}`} lg={3}>
                                    <div className='program_card'>
                                        <div className='program_card_header' >
                                            <span style={{ marginRight: "5px" }}>
                                                Gün :
                                            </span>
                                            <p style={{ color: "#FFCE02" }}>
                                                {el.day}
                                            </p>
                                        </div>
                                        <div className='program_card_footer'>
                                            <p>
                                                <strong>Başlangıç :</strong> <span style={{ color: "#FFCE02" }} >{el.startTime}</span>
                                            </p>
                                            <p>
                                                <strong>Bitiş :</strong> <span style={{ color: "#FFCE02" }} >{el.endTime}</span>
                                            </p>
                                        </div>
                                        <CgClose color='red' className='program_card_close_icon' onClick={() => {
                                            setProgramList(programList.filter(item => item._id !== el._id))
                                        }} />
                                    </div>
                                </Col>
                            )
                        })
                    }
                </Row>
            </Col>

        </Row>
    )
}

export default EditCourseProgram

/* {
    programList.map((el, index) => {
        return (
            <Col key={`${index}`} lg={3}>
                <div className='program_card'>
                    <div className='program_card_header' >
                        <span style={{ marginRight: "5px" }}>
                            Gün :
                        </span>
                        <p style={{ color: "#FFCE02" }}>
                            {el.day}
                        </p>
                    </div>
                    <div className='program_card_footer'>
                        <p>
                            <strong>Başlangıç :</strong> <span style={{ color: "#FFCE02" }} >{el.startTime}</span>
                        </p>
                        <p>
                            <strong>Bitiş :</strong> <span style={{ color: "#FFCE02" }} >{el.endTime}</span>
                        </p>
                    </div>
                    <CgClose color='red' className='program_card_close_icon' onClick={() => {
                            setProgramList(programList.filter(item => item.id !== el.id)) 
                    }} />
                </div>
            </Col>
        )
    })
} */