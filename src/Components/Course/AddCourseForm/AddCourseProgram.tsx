import { TimePicker } from 'antd'
import dayjs from 'dayjs'
import React, { FC, useMemo } from 'react'
import { Button, Col, Label, Row } from 'reactstrap'
import { IProgram } from './AddCourseForm'
import { toast } from 'react-toastify'
import { CgClose, CgViewDay } from 'react-icons/cg'
import { BsCalendar2Day } from 'react-icons/bs'

const AddCourseProgram: FC<{ programData: IProgram, setProgramData: React.Dispatch<React.SetStateAction<IProgram>>, programList: IProgram[], setProgramList: Function }> = ({ programData, programList, setProgramData, setProgramList }) => {


    const dayList = useMemo(() => {
        return ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"]
    }, [])
    const format: string = 'HH:mm'

    const addProgram = () => {
        const control = compareHour(programData.startTime, programData.endTime)
        if (!control) {
            toast.error("bitiş saati başlangıçtan önce olamaz", {
                autoClose: 1500
            })
        } else {
            setProgramList([
                ...programList,
                {
                    ...programData,
                    id: Math.random().toString()
                }
            ])
            setProgramData({
                id: "",
                day: "Pazartesi",
                endTime: "12:30",
                startTime: "12:00"
            })

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


    return (
        <Row>
            <Col lg={3} >
                <div className="mb-3">
                    <Label className="form-label">
                        Gün
                    </Label>
                    <select className={`form-control`} value={programData.day} onChange={(e) => {
                        setProgramData({
                            ...programData,
                            day: e.target.value
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
                                setProgramData({
                                    ...programData,
                                    startTime: `${e.hour()}:${e.minute()}`
                                })
                            }}

                            value={dayjs(programData.startTime, format)} className='custom-time-picker' format={format} />
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
                            setProgramData({
                                ...programData,
                                endTime: `${e.hour()}:${e.minute()}`
                            })

                        }} allowClear={false} value={dayjs(programData.endTime, format)} format={format} />
                    </div>


                </div>
            </Col>
            <Col lg={3} >
                <div className="">
                    <Label className="form-label">

                    </Label>
                    <div style={{ transform: "translateY(20%)" }}>
                        <Button className='px-4' onClick={() => {
                            addProgram()
                        }}  >
                            Ekle
                        </Button>
                    </div>


                </div>
            </Col>
            <Col lg={12} style={{ marginTop: "30px" }} >
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
                                            setProgramList(programList.filter(item => item.id !== el.id))
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

export default AddCourseProgram