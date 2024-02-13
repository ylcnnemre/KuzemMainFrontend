import React from 'react'
import { Container } from 'reactstrap'
import BreadCrumb from '../../Components/Common/BreadCrumb'
import EditAdmin from '../../Components/Admin/EditAdmin/EditAdmin'

const EditAdminPage = () => {
    return (
        <div className='page-content'>
            <Container fluid>
                <BreadCrumb title="Admin Düzenle" />
                <EditAdmin />
            </Container>

        </div>
    )
}

export default EditAdminPage