import React from 'react'
import { Container } from 'reactstrap'
import BreadCrumb from '../../Components/Common/BreadCrumb'
import AddAdmin from '../../Components/Admin/AddAdmin/AddAdmin'

const AddAdminPage = () => {
    return (
        <div className='page-content'>
            <Container fluid>
                <BreadCrumb title="Yönetici ekle" />
                <AddAdmin />
            </Container>
        </div>
    )
}

export default AddAdminPage