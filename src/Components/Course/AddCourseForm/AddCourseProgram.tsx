import { TimePicker } from 'antd'
import dayjs from 'dayjs'
import React, { FC, useEffect, useMemo, useState } from 'react'
import { Button, Col, Label, Row } from 'reactstrap'
import { IProgram } from './AddCourseForm'
import { toast } from 'react-toastify'
import { CgClose } from 'react-icons/cg'
import { getDatesBetween, getDayIndex } from '../../../config/utils'


const AddCourseProgram: FC<{ setCurrent: any, programData: IProgram, formik: any, setProgramData: React.Dispatch<React.SetStateAction<IProgram>>, programList: IProgram[], setProgramList: Function }> = ({ programData, programList, setProgramData, setProgramList, setCurrent, formik }) => {


    const dayList = useMemo(() => {
        return ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"]
    }, [])
    const format: string = 'HH:mm'

    const [programDateList, setProgramDateList] = useState<Array<{ id: string, day: string, dates: Date[] }>>([])

    const addProgram = () => {
        const control = compareHour(programData.startTime, programData.endTime)
        if (!control) {
            toast.error("bitiş saati başlangıçtan önce olamaz", {
                autoClose: 1500
            })
        } else {
            const randomId = Math.random().toString()
            setProgramList([
                ...programList,
                {
                    ...programData,
                    id: randomId
                }
            ])
            setProgramData({
                id: "",
                day: "Pazartesi",
                endTime: "12:30",
                startTime: "12:00"
            })
            const allProgram: Array<{ id: string, day: string, dates: Date[], startTime: string, endTime: string }> = []

            const dataList = [...programList, {
                ...programData,
                id: randomId
            }]

            for (let item of dataList) {
                let dayIndex = getDayIndex(item.day)
                const start = parseISODate(formik.values.startDate)
                const end = parseISODate(formik.values.endDate)
                const list = getDatesBetween(start, end, dayIndex)
                allProgram.push({
                    id: item.id,
                    day: item.day,
                    dates: list,
                    startTime: item.startTime,
                    endTime: item.endTime
                })
            }
            setProgramDateList(allProgram)

            console.log("list DAY==>", allProgram)
        }
    }

    const compareHour = (time1: string, time2: string) => {
        var [saat1, dakika1] = time1.split(':').map(Number);
        var [saat2, dakika2] = time2.split(':').map(Number);
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
                return false;
            }
        }
    }
    function parseISODate(dateString: string): Date {
        const [year, month, day] = dateString.split('-').map(Number);
        return new Date(year, month - 1, day);
    }

    useEffect(() => {
        const start = parseISODate(formik.values.startDate)
        const end = parseISODate(formik.values.endDate)
        const list = getDatesBetween(start, end, 4)
        console.log("list DAY==>", list)
    }, [])


    const deleteDay = (el: IProgram) => {
        console.log("el =>", el)
        console.log("pro  =>", programDateList)
        /*   setProgramList(programList.filter(item => item.id !== el.id))
          setProgramDateList(programDateList.filter(el => el.id !== el.id)) */
        setProgramList(programList.filter(item => item.id !== el.id))
        setProgramDateList(programDateList.filter(item => item.id !== el.id))
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
                                    startTime: `${e.hour()}:${e.minute().toString().padStart(2, "0")}`
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
                                endTime: `${e.hour()}:${e.minute().toString().padStart(2, "0")}`
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

                                            deleteDay(el)
                                        }} />
                                    </div>
                                </Col>
                            )
                        })
                    }
                </Row>
            </Col>
            <Col lg={12}>
                <Row>
                    {
                        programDateList.map(el => {

                            return el.dates.map(item => {
                                return (
                                    <Col lg={3} style={{ marginBottom: "10px" }} >
                                        <div style={{ backgroundColor: "blue", display: "flex" }} >
                                            <h6>
                                                {el.day} { }
                                            </h6>
                                            <h6>
                                                {item.toLocaleDateString()}
                                            </h6>
                                        </div>
                                    </Col>

                                )
                            })
                        })
                    }


                </Row>

            </Col>
            <Col style={{ display: "flex", justifyContent: "flex-end" }} >
                <Button className='btn btn-warning me-4' onClick={() => {
                    setCurrent(0)
                }}  >
                    Geri
                </Button>
                <Button className='btn btn-primary' onClick={() => {
                    if (programList.length == 0) {
                        toast.error("en az bir adet seçim yapılmalı", {
                            autoClose: 1000
                        })
                    }
                    else {
                        setCurrent(2)
                    }

                }}  >
                    İleri
                </Button>
            </Col>
        </Row>
    )
}

export default AddCourseProgram