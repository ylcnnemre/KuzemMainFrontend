import React, { FC, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Button, CardBody, Col, Row, Table } from 'reactstrap'
import { Column, Table as ReactTable, ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, FilterFn } from "@tanstack/react-table"
import { rankItem } from '@tanstack/match-sorter-utils';
import { BsTrash } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { IUserData } from '../../../api/User/UserType';
import aykut from "../../../assets/images/aykut.jpg";
import useUserStore from '../../../zustand/useUserStore';
import { Permission } from '../../../common/constants/PermissionList';



interface IStudentTableProps {
    isGlobalFilter: boolean
    isStudentsFilter: boolean
    columns: any,
    data: any[]
}


const StudentTable: FC<{ data: IUserData[] }> = ({ data }) => {
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const navigate = useNavigate()
    const { user: { permission } } = useUserStore()
    const columns = useMemo(() => [
        {
            header: "#",
            accessorKey: "profileImg",
            enableColumnFilter: false,
            cell: (cell: any) => {
                const imgUrl = cell.getValue() ? `${import.meta.env.VITE_BASEURL}${cell.getValue().path}` : aykut
                return (
                    <div className="d-flex align-items-center">
                        <img src={imgUrl} style={{ width: "40px", height: "40px", borderRadius: "50%" }} alt="" />
                    </div>
                )
            },
        },
        {
            header: "İsim",
            accessorKey: "name",
            enableColumnFilter: false,
            cell: (cell: any) => {
                return (
                    <div className="d-flex align-items-center">
                        <h5 className="fs-14 mb-1" style={{ textTransform: "capitalize" }} >
                            {cell.getValue()}
                        </h5>
                    </div>
                )
            },
        },
        {
            header: "Soyisim",
            accessorKey: "surname",
            enableColumnFilter: false,
            cell: (cell: any) => (
                <>
                    <div className="d-flex align-items-center">

                        <h5 className="fs-14 mb-1" style={{ textTransform: "capitalize" }} >
                            {cell.getValue()}
                        </h5>

                    </div>
                </>
            ),
        },
        {
            header: "Email",
            accessorKey: "email",
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
            header: "Cinsiyet",
            accessorKey: "gender",
            enableColumnFilter: false,
        },
        {
            header: "Doğum Tarihi",
            accessorKey: "birthDate",
            enableColumnFilter: false,
            cell: (cell) => (
                <>
                    <div className="d-flex align-items-center">

                        <h5 className="fs-14 mb-1">
                            {new Date(cell.getValue()).toLocaleDateString()}
                        </h5>

                    </div>
                </>
            ),
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
            accessorKey: "_id",
            cell: (cell: any) => {

                return (
                    <div>
                        {
                            permission.includes(Permission.STUDENT_DELETE) && (
                                <Button color='danger' style={{ marginRight: "30px" }}>
                                    <BsTrash />
                                </Button>
                            )
                        }
                        {
                            permission.includes(Permission.STUDENT_EDIT) && (
                                <Button color='warning' onClick={() => {
                                    navigate(`/ogrenci/${cell.getValue()}`)
                                }} >
                                    <FiEdit />
                                </Button>
                            )
                        }
                    </div>
                )

            },
        },
    ],
        []
    );

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
        <div className="">

            <div className="d-flex my-3 border border-dashed" >

                <input placeholder="ara" className="form-control" style={{ width: "max-content" }} onChange={e => {
                    setGlobalFilter(e.target.value)
                }} />
                {
                    permission.includes(Permission.STUDENT_ADD) && (
                        <div className="col-sm-auto ms-auto">
                            <Link
                                to="/ogrenci/ekle"
                                className="btn btn-primary"
                            >
                                Öğrenci Ekle
                            </Link>
                        </div>
                    )
                }
            </div>
            <div className={"table-responsive mb-1"}>
                <Table hover className={"mb-0 align-middle table-borderless"}>
                    <thead className={"table-light text-muted"}>
                        {table.getHeaderGroups().map((headerGroup: any) => (
                            <tr key={headerGroup.id}>
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
                                <tr key={row.id}>
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
                {
                    <div style={{ display: "flex", flexDirection: "row-reverse", justifyContent: "space-between" }} >
                        <div >
                            <span className="mx-2">Sayfa Başına Kayıt</span>
                            <select

                                value={table.getState().pagination.pageSize}
                                onChange={(e) => {
                                    table.setPageSize(Number(e.target.value));
                                }}
                            >
                                {[2, 4, 6, 8].map((pageSize) => (
                                    <option key={pageSize} value={pageSize}>
                                        {pageSize}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div >

                            <button
                                style={{ padding: "3px", marginRight: "5px" }}
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <span >{'<'}</span>
                            </button>
                            <span>
                                <input
                                    min={1}
                                    max={table.getPageCount()}
                                    type="number"
                                    value={table.getState().pagination.pageIndex + 1}
                                    onChange={(e) => {
                                        const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                        table.setPageIndex(page);
                                    }}

                                />
                                to {table.getPageCount()}
                            </span>
                            <button
                                style={{ padding: "3px", marginLeft: "5px" }}
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                <span >{'>'}</span>
                            </button>

                        </div>
                    </div>
                }

            </div>

        </div>
    )
}

export default StudentTable