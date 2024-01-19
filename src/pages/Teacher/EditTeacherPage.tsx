import React from 'react'
import { Container } from 'reactstrap'
import BreadCrumb from '../../Components/Common/BreadCrumb'
import EditTeacherComponent from '../../Components/Teacher/EditTeacherComponent/EditTeacherComponent'

const EditTeacherPage = () => {
    return (
        <div className='page-content'>
            <Container fluid>
                <BreadCrumb title="Öğretmen Düzenle" />
                <EditTeacherComponent />
            </Container>
        </div>
    )
}

export default EditTeacherPage