import React, { useEffect, useMemo, useState } from 'react'
import { createBranch, deleteBranchApi, getAllBranch, updateBranchApi } from '../../../api/Branch/BranchApi'
import { IBranch } from '../../../api/Branch/BranchType'
import { Button, Col, FormFeedback, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from 'reactstrap'
import "./index.scss"
import { Link } from 'react-router-dom'
import { ColumnDef, ColumnFiltersState, FilterFn, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { FiEdit, FiTrash } from 'react-icons/fi'
import { useFormik } from 'formik'
import * as yup from "yup"
import { toast } from 'react-toastify'

const BranchDashboard = () => {
    const [branch, setBranch] = useState<IBranch[]>([])
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [deleteModalShow, setDeleteModalShow] = useState<{
        show: boolean,
        branchId: string
    }>({
        branchId: "",
        show: false
    })
    const [modalShow, setModalShow] = useState<{
        type: "edit" | "create",
        show: boolean
    }>({
        type: "create",
        show: false
    })
    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const branches = await getAllBranch();
                setBranch(branches.data);
            } catch (err) {
                console.error("Error fetching branches:", err);
            }
        };
        fetchBranches();
    }, [])

    const columns = useMemo<ColumnDef<any>[]>(() => {
        return [
            {
                id: "name",
                accessorKey: "name",
                header: "name",
                cell: ({ getValue }) => {
                    const name: any = getValue()
                    return (
                        <p>
                            {name.substring(0, 15)}
                            {
                                name.length > 15 && (
                                    <span>
                                        ...
                                    </span>
                                )
                            }
                        </p>
                    )
                }
            },
            {
                id: "description",
                accessorKey: "description",
                header: "description",
                cell: ({ getValue }) => {
                    const description: any = getValue()
                    return (
                        <p>
                            {description.substring(0, 10)}...
                        </p>
                    )
                }
            },
            {
                id: "createdBy",
                accessorKey: "createdByUser",
                header: "Oluşturan"
            },
            {
                id: "updatedAt",
                accessorKey: "updatedAt",
                header: "Son Güncelleme",
                cell: ({ getValue }) => {
                    return (
                        <p>
                            {new Date(getValue() as any).toLocaleString()}
                        </p>
                    )
                }
            },
            {
                id: "Action",
                accessorKey: "id",
                header: "İşlemler",
                cell: function render({ getValue }) {
                    return (
                        <div>
                            <Button color="warning" onClick={() => {
                                const selectedBranch = branch.find(el => el._id == getValue())
                                formik.setFieldValue("name", selectedBranch?.name)
                                formik.setFieldValue("description", selectedBranch?.description)
                                formik.setFieldValue("id", selectedBranch?._id)
                                setModalShow({
                                    type: "edit",
                                    show: true
                                })
                            }} >
                                <FiEdit />
                            </Button>
                            <Button color='danger' style={{ marginLeft: "20px" }} onClick={async () => {
                                setDeleteModalShow({
                                    branchId: getValue() as string,
                                    show: true
                                })
                            }} >
                                <FiTrash />
                            </Button>
                        </div>
                    )
                }
            }
        ]

    }, [branch])


    const data = useMemo(() => {
        return branch.map(el => {
            return {
                id: el._id,
                name: el.name,
                description: el.description,
                createdByUser: el.createdByUser[0]?.name,
                updatedAt: el.updatedAt
            }
        })
    }, [branch])

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

    const formik = useFormik({
        initialValues: {
            id: "",
            name: "",
            description: ""
        },
        validationSchema: yup.object({
            name: yup.string().required("İsim Giriniz"),
            description: yup.string().required("Açıklama giriniz")
        }),
        onSubmit: async (value, { resetForm }) => {
            try {
                if (modalShow.type == "create") {
                    const response = await createBranch(value)
                    setBranch(response.data.map(el => el))
                    toast.success("branş kayıt edildi", {
                        autoClose: 1000
                    })
                    resetForm()
                    setModalShow({
                        type: "create",
                        show: false
                    })
                }
                else {
                    console.log("val =>", value)
                    const response = await updateBranchApi(value)
                    setBranch(response.data.map(el => el))
                    toast.success("branş kayıt edildi", {
                        autoClose: 1000
                    })
                    resetForm()
                    setModalShow({
                        type: "create",
                        show: false
                    })
                }
            }
            catch (err: any) {
                toast.error(err.response.data.message, {
                    autoClose: 1500
                })
            }

        }
    })



    return (
        <div className="">

            <div className="d-flex mb-3 border border-dashed" >

                <input placeholder="ara" className="form-control" style={{ width: "max-content" }} onChange={e => {
                    setGlobalFilter(e.target.value)
                }} />
                <div className="col-sm-auto ms-auto">
                    <Button
                        color='primary'
                        onClick={() => {
                            setModalShow({
                                show: true,
                                type: "create"
                            })
                        }}
                    >
                        Branş Ekle
                    </Button>
                </div>
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


            <Modal isOpen={modalShow.show}>
                <ModalHeader>
                    {
                        modalShow.type == "edit" ? "Branş Düzenle" : "Branş Ekle"
                    }
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col lg={12}>
                            <div className="mb-3">
                                <Label htmlFor="firstnameInput" className="form-label">
                                    İsim
                                </Label>
                                <Input type="text" className="form-control" id="name" name='name'
                                    placeholder='isim'
                                    value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                    invalid={
                                        formik.touched.name && formik.errors.name ? true : false
                                    }
                                />
                                {formik.touched.name && formik.errors.name ? (
                                    <FormFeedback type="invalid"><div>{formik.errors.name}</div></FormFeedback>
                                ) : null}
                            </div>
                        </Col>
                        <Col lg={12}>
                            <div className="mb-3">
                                <Label htmlFor="firstnameInput" className="form-label">
                                    Açıklama
                                </Label>
                                <Input type="textarea" className="form-control" id="name" name='description'
                                    style={{ resize: "none" }}
                                    placeholder='açıklama'
                                    value={formik.values.description} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                    invalid={
                                        formik.touched.description && formik.errors.description ? true : false
                                    }
                                />
                                {formik.touched.description && formik.errors.description ? (
                                    <FormFeedback type="invalid"><div>{formik.errors.description}</div></FormFeedback>
                                ) : null}
                            </div>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => {
                        formik.handleSubmit()
                    }} >
                        {
                            modalShow.type == "edit" ? "Güncelle" : "Ekle"
                        }
                    </Button>
                    <Button color='danger' onClick={() => {
                        setModalShow({
                            show: false,
                            type: "create"
                        })
                    }} >
                        İptal
                    </Button>
                </ModalFooter>
            </Modal>


            <Modal isOpen={deleteModalShow.show}>
                <ModalHeader>
                    Onay Formu
                </ModalHeader>
                <ModalBody>
                    Bu branşı silmek istediğinize emin misiniz ?
                </ModalBody>
                <ModalFooter>
                    <Button color='danger' onClick={async () => {
                        try {
                            await deleteBranchApi(deleteModalShow.branchId)

                            setBranch(branch.filter(el => el._id !== deleteModalShow.branchId))

                            setDeleteModalShow({
                                show: false,
                                branchId: ""
                            })
                            toast.success("Silme işlemi başarılı", {
                                autoClose: 1000
                            })
                        }
                        catch (err: any) {
                            toast.error(err.response.data.message, {
                                autoClose: 1500
                            })
                            setDeleteModalShow({
                                show: false,
                                branchId: ""
                            })
                        }
                    }} >
                        Sil
                    </Button>
                    <Button onClick={() => {
                        setDeleteModalShow({
                            show: false,
                            branchId: ""
                        })
                    }}>
                        İptal
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default BranchDashboard