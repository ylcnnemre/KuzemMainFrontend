import React, { useEffect, useMemo, useState } from 'react'
import { getStudentCourseApi } from '../../../api/User/UserApi'
import { useParams } from 'react-router-dom'
import { ICourseType } from '../../../api/Course/CourseTypes'
import { Button, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane, Table } from 'reactstrap'
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'

const EditStudentCourseInfo = () => {
  const [courseData, setCourseData] = useState<ICourseType[]>([])
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [activeTab, setActiveTab] = useState<number>(1)
  const { id } = useParams()
  const getCourse = async () => {
    try {
      console.log("idd ==>", id)
      const response = await getStudentCourseApi(id as string)
      console.log("resp ==>", response)
      setCourseData(response.data.map(item => item.course))
    }
    catch (err) {
      console.log("err ==>", err)
    }
  }

  useEffect(() => {
    getCourse()
  }, [])
  const columns = useMemo<ColumnDef<any>[]>(() => {
    return [
      {
        id: "title",
        accessorKey: "title",
        header: "isim"
      },
      {
        id: "semester",
        accessorKey: "semester",
        header: "dönem",
        cell: ({ getValue }) => {
          return <p>
            asd
          </p>
        }
      },
      {
        id: "teacher",
        accessorKey: "teacher",
        header: "eğitmen",
        cell: ({ getValue }) => {
          const teacher: any = getValue()
          return (
            <p>
              {teacher.name} {teacher.surname}
            </p>
          )
        }
      },
      {
        id: "description",
        accessorKey: "description",
        header: "açıklama"
      },
      {
        id: "startDate",
        accessorKey: "startDate",
        header: "Başlangıç",
        cell: ({ getValue }) => {
          const date: any = getValue()
          const tarih = new Date(date).toLocaleDateString()
          return (
            <p>
              {tarih}
            </p>
          )
        }
      },
    ]

  }, [])

  const data = useMemo(() => {
    return courseData
  }, [courseData])

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnFilters,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 8
      }
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel()
  });
  return (
    <Row>
      <Col lg={12} >
        <div className="">
          <div className="d-flex mb-3 " >
            <input placeholder="ara" className="form-control" style={{ width: "max-content" }} onChange={e => {
              setGlobalFilter(e.target.value)
            }} />
          </div>
          <div className={"table-responsive mb-1"}>
            <Table hover className={"mb-0 align-middle table-borderless"}>
              <thead className={"table-light text-muted"}>
                {table.getHeaderGroups().map((headerGroup: any) => (
                  <tr key={headerGroup.id}  >
                    {headerGroup.headers.map((header: any) => (
                      <th key={header.id}   {...{
                        onClick: header.column.getToggleSortingHandler(),
                      }}>
                        {header.isPlaceholder ? null : (
                          <React.Fragment>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: ' ',
                              desc: ' ',
                            }
                            [header.column.getIsSorted() as string] ?? null}

                          </React.Fragment>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              <tbody>
                {table.getRowModel().rows.map((row: any) => {
                  return (
                    <tr key={row.id} style={{ cursor: "pointer" }} >
                      {row.getVisibleCells().map((cell: any) => {
                        return (
                          <td key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </Table>


          </div>

        </div>
      </Col>

    </Row>
  )
}

export default EditStudentCourseInfo