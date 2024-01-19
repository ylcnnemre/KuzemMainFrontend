import React from 'react'
import TeacherDashboard from '../../Components/Teacher/TeacherDashboard/TeacherDashboard'
import BreadCrumb from '../../Components/Common/BreadCrumb'
import { Container } from 'reactstrap'
import useUserStore from '../../zustand/useUserStore'

const TeacherPage = () => {
  return (
    <div className='page-content'>
      <Container fluid>
        <BreadCrumb title="Öğretmenler" />
        <TeacherDashboard />
      </Container>

    </div>
  )
}

export default TeacherPage