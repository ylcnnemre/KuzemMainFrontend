import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import Widget from "./Widgets";
import Section from "./Section";
import useUserStore from "../../zustand/useUserStore";


const Dashboard = () => {
  document.title = "Anasayfa";
  const { user } = useUserStore()
  const [rightColumn, setRightColumn] = useState(true);
  const toggleRightColumn = () => {
    setRightColumn(!rightColumn);
  };


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Dashboards" pageTitle="Anasayfa" />
          <Row>
            <Col>
              <div className="h-100">
                <Section rightClickBtn={toggleRightColumn} />
                <Row>
                  <Widget />
                </Row>
                <Row>
                  <Col xl={8}>

                  </Col>

                </Row>

              </div>
            </Col>
            {/*     <RecentActivity rightColumn={rightColumn} hideRightColumn={toggleRightColumn} /> */}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
