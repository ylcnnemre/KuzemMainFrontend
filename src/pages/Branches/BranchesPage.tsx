import React from 'react'
import { Container } from 'reactstrap'
import BreadCrumb from '../../Components/Common/BreadCrumb'
import BranchDashboard from '../../Components/Branches/BranchDashboard/BranchesComponent'

const BranchesPage = () => {
    return (
        <div className='page-content' >
            <Container fluid >
                <BreadCrumb title={"Branşlar"} />
                <BranchDashboard />
            </Container>
        </div>
    )
}

export default BranchesPage