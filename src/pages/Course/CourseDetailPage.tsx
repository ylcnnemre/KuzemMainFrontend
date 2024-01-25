import React from 'react'
import { Container } from 'reactstrap'
import BreadCrumb from '../../Components/Common/BreadCrumb'
import DetailCourse from '../../Components/Course/DetailCourse/DetailCourse'

const CourseDetailPage = () => {
    return (
        <div className='page-content'>
            <Container fluid>
                <BreadCrumb title="Kurs Detay" />
                <DetailCourse />
            </Container>
        </div>
    )
}

export default CourseDetailPage