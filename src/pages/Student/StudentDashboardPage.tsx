import React from 'react'
import BreadCrumb from '../../Components/Common/BreadCrumb'
import { Container } from 'reactstrap'
import StudentDasboard from '../../Components/Student/StudentDashboard/StudentDasboard'

const StudentDashboardPage = () => {
    return (
        <div className='page-content'>
            <Container fluid>
                <BreadCrumb title="Öğrenciler" />
                <StudentDasboard />
            </Container>
        </div>
    )
}

export default StudentDashboardPage