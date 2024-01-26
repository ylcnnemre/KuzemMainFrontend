import React from 'react'
import { Container } from 'reactstrap'
import BreadCrumb from '../../Components/Common/BreadCrumb'
import EditCourse from '../../Components/Course/EditCourse/EditCourse'

const EditCoursePage = () => {
    return (
        <div className='page-content'>
            <Container fluid >
                <BreadCrumb title="Kurs Düzenle" />
                <EditCourse />
            </Container>
        </div>
    )
}

export default EditCoursePage