import React from 'react'
import { Container } from 'reactstrap'
import BreadCrumb from '../../Components/Common/BreadCrumb'
import CourseDashboard from '../../Components/Course/Dashboard/CourseDashboard'

const CoursePage = () => {
    return (
        <div className='page-content' >
            <Container fluid>
                <BreadCrumb title={"Kurslar"} />
                <CourseDashboard />
            </Container>
        </div>
    )
}

export default CoursePage