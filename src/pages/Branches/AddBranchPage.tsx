import React from 'react'
import { Container } from 'reactstrap'
import BreadCrumb from '../../Components/Common/BreadCrumb'
import AddBranchForm from '../../Components/Branches/AddBranchForm/AddBranchForm'

const AddBranchPage = () => {
  return (
    <div className='page-content'>
      <Container fluid>
        <BreadCrumb title="Branş Ekle" />
        <AddBranchForm />
      </Container>
    </div>
  )
}

export default AddBranchPage