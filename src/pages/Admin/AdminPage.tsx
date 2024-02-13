import React from 'react'
import { Container } from 'reactstrap'
import BreadCrumb from '../../Components/Common/BreadCrumb'
import AdminDashboard from '../../Components/Admin/AdminDashboard/AdminDashboard'

const AdminPage = () => {
  return (
    <div className='page-content'>
      <Container fluid>
        <BreadCrumb title="Admin" />
        <AdminDashboard />
      </Container>
    </div>
  )
}

export default AdminPage