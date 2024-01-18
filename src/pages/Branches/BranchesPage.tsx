import React from 'react'
import { Container } from 'reactstrap'
import BreadCrumb from '../../Components/Common/BreadCrumb'
import BranchesComponent from '../../Components/Branches/BranchesComponent'

const BranchesPage = () => {
    return (
        <div className='page-content' >
            <Container fluid >
                <BreadCrumb title={"Branşlar"} />
                <BranchesComponent />
            </Container>
        </div>
    )
}

export default BranchesPage