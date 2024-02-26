import React, { FC, useState } from 'react'
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import { ICourseType } from '../../../api/Course/CourseTypes'
import "./index.scss"
import { MdAnnouncement, MdNotifications } from 'react-icons/md'
const CourseAnnouncementModal: FC<{ modalShow: boolean, setModalShow: Function, data: ICourseType["announcement"] }> = ({ modalShow, setModalShow, data }) => {
    const [detailModal, setDetailModal] = useState<boolean>(false)
    const [selectedAnnouncement, setSelectedAnnouncement] = useState<any>()
    return (
        <>
            <Modal isOpen={modalShow} size='lg' >
                <ModalHeader>
                    <h5>
                        Duyurular
                    </h5>
                </ModalHeader>
                <ModalBody>
                    <div className='course_announcement_container'>
                        <Row>
                            {
                                data.map((el, index) => {
                                    return (
                                        <Col lg={4} key={`${index}`}>
                                            <div className='course_announcement_container_card' onClick={() => {
                                                setSelectedAnnouncement(data.find(item => {
                                                    return item._id == el._id
                                                }))
                                                setDetailModal(true)
                                            }} >
                                                <MdNotifications fontSize={23} style={{ marginRight: "5px" }} />
                                                <p style={{ textTransform: "capitalize" }}>
                                                    {el.title}
                                                </p>
                                            </div>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className='btn btn-danger' onClick={() => {
                        setModalShow(false)
                    }} >
                        Kapat
                    </Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={detailModal} toggle={() => {
                setDetailModal(!detailModal)
            }} >
                <ModalHeader>
                    {selectedAnnouncement?.title}
                </ModalHeader>
                <ModalBody>
                    <p>
                        {selectedAnnouncement?.content}
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button className='btn btn-danger' onClick={()=>{
                        setDetailModal(false)
                    }}>
                        Kapat
                    </Button>
                </ModalFooter>
            </Modal>
        </>

    )
}

export default CourseAnnouncementModal