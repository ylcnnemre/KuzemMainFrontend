import React, { FC } from 'react'
import BreadCrumb from '../Components/Common/BreadCrumb'
import { Container } from 'reactstrap'

const ContentLayout: FC<{ title: string, children: React.ReactNode }> = ({ children, title }) => {
    return (
        <div className='page-content' >
            <Container fluid>
                <BreadCrumb title={title} />
                {children}
            </Container>
        </div>
    )
}

export default ContentLayout