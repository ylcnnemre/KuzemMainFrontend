import React, { FC, useMemo } from 'react'
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import DetailWidget from '../DetailCourse/DetailWidget'
import { IoTimeOutline } from 'react-icons/io5'
import { IoMdTime } from 'react-icons/io'
import { VscSymbolField } from 'react-icons/vsc'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { TbFileDescription } from 'react-icons/tb'
import { ICourseType } from '../../../api/Course/CourseTypes'

const CourseDetailModal: FC<{ modalShow: boolean, setModalShow: Function, selectedCourse: ICourseType }> = ({ modalShow, setModalShow, selectedCourse }) => {

    const startDate = useMemo(() => {
        return new Date(selectedCourse?.startDate ?? "").toLocaleDateString()
    }, [selectedCourse?.startDate])

    const endDate = useMemo(() => {
        return new Date(selectedCourse?.endDate ?? "").toLocaleDateString()
    }, [selectedCourse?.endDate])

    const teacherName = useMemo(() => {
        return selectedCourse?.teacher.name + " " + selectedCourse?.teacher.surname
    }, [selectedCourse?.teacher])

    return (
        <Modal isOpen={modalShow} size='lg' >
            <ModalHeader>
                <h5>
                    Ayrıntılar
                </h5>
            </ModalHeader>
            <ModalBody>
                <Row >
                    <Col lg={6} sm={3}   >
                        <DetailWidget icon={<IoTimeOutline />} title='Kurs Başlangıç' value={startDate ?? ""} />
                    </Col>
                    <Col lg={6} sm={3} style={{ marginBottom: "15px" }}  >
                        <DetailWidget icon={<IoMdTime />} title='Kurs Bitişi' value={endDate ?? ""} />
                    </Col>
                    <Col lg={6} >
                        <DetailWidget icon={<VscSymbolField />} title='Branş' value={selectedCourse?.branch.name} />
                    </Col>
                    <Col lg={6} style={{ marginBottom: "15px" }}  >
                        <DetailWidget icon={<FaChalkboardTeacher />} title='Eğitmen' value={teacherName} />
                    </Col>
                    <Col lg={12} style={{ marginBottom: "15px" }} >
                        <DetailWidget icon={<TbFileDescription />} title='Açıklama' value={selectedCourse?.description} />
                    </Col>
                    <Col lg={12}>
                        {
                            selectedCourse && selectedCourse.schedules.length !== 0 && (
                                <Row>
                                    <h5>
                                        Program
                                    </h5>
                                    {
                                        selectedCourse?.schedules.map((item, index) => {
                                            return (
                                                <Col key={`${index}`} sm={4} >
                                                    <div className='program_card'>
                                                        <p  >
                                                            <strong>Gün :</strong> <span style={{ color: "#FFCE02" }}>{item.day}</span>
                                                        </p>
                                                        <div className='program_card_date mt-2'>
                                                            <p>
                                                                <strong>Başlangıç : </strong> <span style={{ color: "#FFCE02" }}>{item.startTime}</span>
                                                            </p>
                                                            <p>
                                                                <strong>Bitiş : </strong> <span style={{ color: "#FFCE02" }}>{item.endTime}</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Col>
                                            )
                                        })
                                    }
                                </Row>
                            )
                        }
                    </Col>

                </Row>
            </ModalBody>
            <ModalFooter>
                <Button className='btn btn-danger' onClick={() => {
                    setModalShow(false)
                }} >
                    Kapat
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default CourseDetailModal