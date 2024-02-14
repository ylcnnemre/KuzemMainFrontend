import React, { FC, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import useUserStore from '../../zustand/useUserStore';
import { ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { Button, Table } from 'reactstrap';
import { BsTrash } from 'react-icons/bs';
import { Permission } from '../../common/constants/PermissionList';
import { FiEdit } from 'react-icons/fi';
import SemesterSaveModal from './SemesterSaveModal';
import { ISemester } from '../../api/Semester/SemesterType';

const SemesterTable: FC<{ data: ISemester[], setSemesterData: React.Dispatch<React.SetStateAction<ISemester[]>> }> = ({ data, setSemesterData }) => {
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const navigate = useNavigate()
    const [editMode, setEditMode] = useState<boolean>(false)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [selectedId, setSelectedId] = useState<string>()
    const { user: { permission } } = useUserStore()
    console.log("dataa1 ==>", data)
    const columns = useMemo(() => [
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
            header: "Dönem",
            accessorKey: "period",
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
            header: "Yıl",
            accessorKey: "year",
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
            header: "Açıklama",
            accessorKey: "description",
            enableColumnFilter: false,
        },
        {
            header: "Durum",
            accessorKey: "active",
            cell: (cell: any) => {
                return (
                    <div className="d-flex align-items-center" onClick={() => {
                        console.log("cel ==>", cell.getValue())
                    }}>

                        <h5 className="fs-14 mb-1">
                            {cell.getValue() ? "aktif" : "pasif"}
                        </h5>
                    </div>
                )
            }
        },
        {
            header: "Action",
            accessorKey: "_id",
            cell: (cell: any) => {

                return (
                    <div>
                        {
                            permission.includes(Permission.ADMIN_DELETE) && (
                                <Button color='danger' style={{ marginRight: "30px" }}>
                                    <BsTrash />
                                </Button>
                            )
                        }
                        {
                            permission.includes(Permission.ADMIN_EDIT) && (
                                <Button color='warning' onClick={() => {
                                    setSelectedId(cell.getValue())
                                    setEditMode(true)
                                    setShowModal(true)
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

    const mainData = useMemo(() => {
        return data
    }, [data])

    const table = useReactTable({
        data: mainData,
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

    const selectedSemesterData = useMemo(() => {
        return data.find(el => el._id == selectedId)
    }, [selectedId, data])

    return (
        <div className="">
            <SemesterSaveModal editMode={editMode} editData={selectedSemesterData} setSemesterData={setSemesterData} setShowModal={setShowModal} showModal={showModal} />
            <div className="d-flex my-3 border border-dashed" >

                <input placeholder="ara" className="form-control" style={{ width: "max-content" }} onChange={e => {
                    setGlobalFilter(e.target.value)
                }} />
                {
                    permission.includes(Permission.ADMIN_ADD) && (
                        <div className="col-sm-auto ms-auto">
                            <Button
                                onClick={() => {
                                    setEditMode(false)
                                    setShowModal(true)
                                }}
                                className="btn btn-primary"
                            >
                                Donem Ekle
                            </Button>
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

export default SemesterTable