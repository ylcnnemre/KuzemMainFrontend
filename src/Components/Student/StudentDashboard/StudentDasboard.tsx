import classNames from 'classnames';
import React, { useMemo, useState } from 'react'
import { Row, Col, Card, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Dropdown, Button } from 'reactstrap'
import StudentTable from './StudentTable';
import { Link } from 'react-router-dom';
import { BsTrash } from 'react-icons/bs';
import { CgEditFlipH } from 'react-icons/cg';
import { FiEdit } from 'react-icons/fi';

const StudentDasboard = () => {
  const [activeTab, setActiveTab] = useState<any>("1");
  const [dele, setDele] = useState(0);
  const [studentList, setStudentList] = useState<any>([{
    name: "emre",
    tcNo: "37150160766",
    phone: "505005765"
  }, {
    name: "derya",
    tcNo: "37150160761231236",
    phone: "505005765"
  },
  {
    name: "emre",
    tcNo: "37150160766",
    phone: "505005765"
  }, {
    name: "derya",
    tcNo: "37150160761231236",
    phone: "505005765"
  },
  {
    name: "emre",
    tcNo: "37150160766",
    phone: "505005765"
  }, {
    name: "derya",
    tcNo: "37150160761231236",
    phone: "505005765"
  },{
    name: "emre",
    tcNo: "37150160766",
    phone: "505005765"
  }, {
    name: "derya",
    tcNo: "37150160761231236",
    phone: "505005765"
  },{
    name: "emre",
    tcNo: "37150160766",
    phone: "505005765"
  }, {
    name: "derya",
    tcNo: "37150160761231236",
    phone: "505005765"
  },{
    name: "emre",
    tcNo: "37150160766",
    phone: "505005765"
  }, {
    name: "kemal",
    tcNo: "123",
    phone: "789"
  }]);

  const toggleTab = (tab: any, type: any) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const columns = useMemo(() => [
    {
      header: "İsim",
      accessorKey: "name",
      enableColumnFilter: false,
      cell: (cell: any) => (
        <>
          <div className="d-flex align-items-center">

            <h5 className="fs-14 mb-1">
              {cell.getValue()}
            </h5>

          </div>
        </>
      ),
    },
    {
      header: "Tc No",
      accessorKey: "tcNo",
      enableColumnFilter: false,
    },
    {
      header: "Telefon",
      accessorKey: "phone",
      enableColumnFilter: false,
      cell: (cell: any) => {
        return <p>
          {cell.getValue()}
        </p>
      },
    },
    {
      header: "Action",
      cell: (cell: any) => {
        return (
          <div>
            <Button color='danger' style={{ marginRight: "30px" }}>
              <BsTrash />  
            </Button>
            <Button color='warning'>
              <FiEdit />
            </Button>
          </div>
        )

      },
    },
  ],
    []
  );

  return (
    <Row>
      <Col lg={12}>
        <div>

          <Card>
            <div className="card-header border-0">
              <Row className=" align-items-center">
                <Col>
                  <Nav
                    className="nav-tabs-custom card-header-tabs border-bottom-0"
                    role="tablist"
                  >
                    <NavItem>
                      <NavLink
                        className={classNames(
                          { active: activeTab === "1" },
                          "fw-semibold"
                        )}
                        onClick={() => {
                          toggleTab("1", "all");
                        }}
                        href="#"
                      >
                        All{" "}
                        <span className="badge bg-danger-subtle text-danger align-middle rounded-pill ms-1">
                          12
                        </span>
                      </NavLink>
                    </NavItem>


                  </Nav>
                </Col>
              </Row>
            </div>
            <div className="card-body pt-0">
              {studentList && studentList.length > 0 ? (
                <StudentTable
                  data={studentList || []}
                  columns={columns}
                  isGlobalFilter={true}
                  isStudentsFilter={true}
                />
              ) : (
                <div className="py-4 text-center">
                  <div>
                    <i className="ri-search-line display-5 text-success"></i>
                  </div>

                  <div className="mt-4">
                    <h5>Sorry! No Result Found</h5>
                  </div>
                </div>
              )}
            </div>


          </Card>
        </div>
      </Col>

    </Row>
  )
}

export default StudentDasboard