import React from 'react'
import { Container } from 'reactstrap'
import BreadCrumb from '../../Components/Common/BreadCrumb'
import AddCourseForm from '../../Components/Course/AddCourseForm/AddCourseForm'

const AddCoursePage = () => {
    return (
        <div className='page-content'>
            <Container fluid>
                <BreadCrumb title='Kurs Ekle' />
                <AddCourseForm />
            </Container>
        </div>
    )
}

export default AddCoursePage