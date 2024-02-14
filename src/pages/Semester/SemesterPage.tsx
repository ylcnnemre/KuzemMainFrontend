import React from 'react'
import { Container } from 'reactstrap'
import BreadCrumb from '../../Components/Common/BreadCrumb'
import SemesterDashboard from '../../Components/Semester/SemesterDashboard'

const SemesterPage = () => {
    return (
        <div className='page-content'>
            <Container fluid>
                <BreadCrumb title="Dönemler" />
                <SemesterDashboard />
            </Container>
        </div>
    )
}

export default SemesterPage