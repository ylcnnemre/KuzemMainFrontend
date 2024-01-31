import React from 'react'
import BreadCrumb from '../../Components/Common/BreadCrumb'
import { Container } from 'reactstrap'
import AddStudent from '../../Components/Student/AddStudent/AddStudent'

const AddStudentPage = () => {
  return (
    <div className='page-content'>
      <Container fluid>
        <BreadCrumb title="Öğrenci Ekle" />
        <AddStudent />
      </Container>
    </div>
  )
}

export default AddStudentPage