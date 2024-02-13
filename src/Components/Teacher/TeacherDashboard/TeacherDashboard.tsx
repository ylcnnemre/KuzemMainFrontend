import React, { useEffect, useMemo, useState } from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap'
import { Link, useNavigate } from "react-router-dom"
import "./index.scss"
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { getUserByRoleApi } from '../../../api/User/Teacher/TeacherApi'
import { ITeacherType } from '../../../api/User/Teacher/teacherType'
import { deleteUserApi } from '../../../api/User/UserApi'
import { toast } from 'react-toastify'
import useUserStore from '../../../zustand/useUserStore'
import { Permission } from '../../../common/constants/PermissionList'

const TeacherDashboard = () => {
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [teacher, setTeachers] = useState<ITeacherType[]>([])
    const [deleteModal, setDeleteModal] = useState<{
        show: boolean,
        id: string
    }>()
    const navigate = useNavigate()
    const { user: { permission } } = useUserStore()
    const getAllTeacher = async () => {
        const response = await getUserByRoleApi("teacher")
        console.log("responseTeacher ==>", response)
        setTeachers(response.data)
    }

    useEffect(() => {
        getAllTeacher()
    }, [])


    const editTeacher = (id: string) => {
        navigate(`/egitmen/duzenle/${id}`)
    }


    const deleteTeacher = async (id: string) => {
        try {
            const response = await deleteUserApi(id)
            console.log("iddd ==>", id)
            console.log("teacher ==>", teacher)
            setTeachers(teacher.filter(el => el._id !== id))
            toast.success("Eğitmen silindi", {
                autoClose: 1000
            })
        }
        catch (err: any) {
            toast.error(err.response.data.message, {
                autoClose: 1000
            })
        }
    }


    const columns = useMemo<ColumnDef<any>[]>(() => {
        return [
            {
                id: "name",
                accessorKey: "name",
                header: "İsim",
            },
            {
                id: "surname",
                accessorKey: "surname",
                header: "Soyisim"
            },
            {
                id: "email",
                accessorKey: "email",
                header: "Email",
            },
            {
                id: "phone",
                accessorKey: "phone",
                header: "Telefon"
            },
            {
                id: "branch",
                accessorKey: "branch",
                header: "Branş"
            },
            {
                id: "actions",
                accessorKey: "id",
                header: "Action",
                cell: function render({ getValue }) {
                    return (
                        <div>
                            {
                                permission.includes(Permission.TEACHER_EDIT) && (
                                    <Button color="warning" style={{ marginRight: "10px" }} onClick={() => {
                                        navigate(`/egitmen/duzenle/${getValue()}`)

                                    }} >
                                        Düzenle
                                    </Button>
                                )
                            }
                            {
                                permission.includes(Permission.TEACHER_DELETE) && (
                                    <Button color="danger" onClick={() => {
                                        setDeleteModal({
                                            show: true,
                                            id: getValue() as string
                                        })
                                    }} >
                                        Sil
                                    </Button>
                                )
                            }
                        </div>
                    )
                }
            }
        ]
    }, [teacher])

    const data = useMemo(() => {
        return teacher.map(item => {
            return {
                id: item._id,
                name: item.name,
                surname: item.surname,
                email: item.email,
                phone: item.phone,
                branch: item.branch?.name
            }
        })

    }, [teacher])

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

            <div>
                <Modal isOpen={deleteModal?.show} toggle={() => {
                    setDeleteModal({
                        show: false,
                        id: deleteModal?.id ?? ""
                    })
                }} >
                    <ModalHeader toggle={() => {
                        setDeleteModal({
                            show: false,
                            id: deleteModal?.id ?? ""
                        })
                    }}>Onay</ModalHeader>
                    <ModalBody>
                        <h5>
                            Silmek istediğinize emin misiniz ?
                        </h5>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={() => {
                            deleteTeacher(deleteModal?.id as string)
                        }} >
                            Sil
                        </Button>{' '}
                        <Button color="secondary" onClick={() => {
                            setDeleteModal({
                                id: "",
                                show: false
                            })
                        }} >
                            Vazgeç
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>


            <div className={`d-flex mb-3  ${permission.includes(Permission.TEACHER_ADD) ? "border border-dashed" : null}`} >

                <input placeholder="ara" className="form-control" style={{ width: "max-content" }} onChange={e => {
                    setGlobalFilter(e.target.value)
                }} />
                {
                    permission.includes(Permission.TEACHER_ADD) && (
                        <div className="col-sm-auto ms-auto">
                            <Link
                                to="/egitmen/ekle"
                                className="btn btn-primary"
                            >
                                Eğitmen Ekle
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

export default TeacherDashboard

/* 12345*Abcd */

/* wget -qO- https://ubuntu.bigbluebutton.org/bbb-install-2.5.sh | sudo bash -s -- -v focal-250 -s 164.90.185.42 -e yalcnnemre@gmail.com  -a -w -g */