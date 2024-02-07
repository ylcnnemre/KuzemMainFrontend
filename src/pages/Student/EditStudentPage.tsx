import React from 'react'
import {  Container } from 'reactstrap'
import EditStudent from '../../Components/Student/EditStudent/EditStudent'
import BreadCrumb from '../../Components/Common/BreadCrumb'

const EditStudentPage = () => {
    return (
        <div className='page-content'>
            <Container fluid>
                <BreadCrumb title="Öğrenci Düzenle" />
                <EditStudent />
            </Container>
        </div>
    )
}

export default EditStudentPage