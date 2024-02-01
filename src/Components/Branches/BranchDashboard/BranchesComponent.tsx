import React, { useEffect, useMemo, useState } from 'react'
import { getAllBranch } from '../../../api/Branch/BranchApi'
import { IBranch } from '../../../api/Branch/BranchType'
import { Button, Table } from 'reactstrap'
import "./index.scss"
import { Link } from 'react-router-dom'
import { ColumnDef, ColumnFiltersState, FilterFn, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'


const BranchDashboard = () => {
    const [branch, setBranch] = useState<IBranch[]>([])
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

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
                header: "name"
            },
            {
                id: "description",
                accessorKey: "description",
                header: "description"
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
                id: "actions",
                accessorKey: "id",
                header: "Action",
                cell: function render({ getValue }) {
                    return (
                        <div>
                            <Button color="warning">
                                Sil
                            </Button>
                        </div>
                    )
                }
            }
        ]

    }, [])


    const data = useMemo(() => {
        return branch.map(el => {
            return {
                name: el.name,
                description: el.description,
                createdByUser: el.createdByUser[0].name,
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
    console.log("selammm")


    return (
        <div className="">

            <div className="d-flex mb-3 border border-dashed" >

                <input placeholder="ara" className="form-control" style={{ width: "max-content" }} onChange={e => {
                    setGlobalFilter(e.target.value)
                }} />
                <div className="col-sm-auto ms-auto">
                    <Link
                        to="/brans/ekle"
                        className="btn btn-primary"
                    >
                       Branş Ekle
                    </Link>
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

        </div>
    )
}

export default BranchDashboard