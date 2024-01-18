import React from 'react'
import { Table } from 'reactstrap'
import { Link } from "react-router-dom"
const TeacherDashboard = () => {
  return (
    <div className='page-content'>
      <div className="table-responsive mx-4 mt-4">
        <div className='d-flex justify-content-end'>
          <Link to={"/egitmen/ekle"}>
            <button className='btn btn-success px-4 py-1'>
              Eğitmen Ekle
            </button>
          </Link>

        </div>
        <Table className="table-striped table-nowrap align-middle mb-0">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Customer</th>
              <th scope="col">Date</th>
              <th scope="col">Invoice</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="fw-medium">01</td>
              <td>Bobby Davis</td>
              <td>Nov 14, 2021</td>
              <td>$2,410</td>
              <td><span className="badge bg-success">Confirmed</span></td>
            </tr>
            <tr>
              <td className="fw-medium">02</td>
              <td>Christopher Neal</td>
              <td>Nov 21, 2021</td>
              <td>$1,450</td>
              <td><span className="badge bg-warning">Waiting</span></td>
            </tr>
            <tr>
              <td className="fw-medium">03</td>
              <td>Monkey Karry</td>
              <td>Nov 24, 2021</td>
              <td>$3,500</td>
              <td><span className="badge bg-success">Confirmed</span></td>
            </tr>
            <tr>
              <td className="fw-medium">04</td>
              <td>Aaron James</td>
              <td>Nov 25, 2021</td>
              <td>$6,875</td>
              <td><span className="badge bg-danger">Cancelled</span></td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default TeacherDashboard