import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import withRouter from './withRouter';
import { withTranslation } from 'react-i18next';

const BreadCrumb = (props: any) => {
    const { title, pageTitle, t } = props
    console.log("propss =>>", props)
    return (
        <React.Fragment>
            <Row>
                <Col xs={12}>
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 className="mb-sm-0">{t(title)} </h4>

                       {/*  <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                <li className="breadcrumb-item"><Link to="#">{pageTitle}</Link></li>
                                <li className="breadcrumb-item active">{title}</li>
                            </ol>
                        </div> */}

                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default withRouter(withTranslation()(BreadCrumb))