import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import React, { FC, useMemo, useState } from 'react'
import { Button, Table } from 'reactstrap';
import { IUserData } from '../../../api/User/UserType';

const EditTeacherResponseCourseTable: FC<{ data: IUserData }> = ({ data }) => {
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    console.log("dta =>", data)

    const columns = useMemo<ColumnDef<any>[]>(() => [
        {
            header: "İsim",
            accessorKey: "title",
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
            accessorKey: "semester",
            enableColumnFilter: false,
            cell: (cell: any) => (
                <>
                    <div className="d-flex align-items-center">

                        <h5 className="fs-14 mb-1" style={{ textTransform: "capitalize" }} >
                            {cell.getValue().name}
                        </h5>

                    </div>
                </>
            ),
        },
        {
            header: "Yıl",
            accessorKey: "semester",
            enableColumnFilter: false,
            cell: (cell: any) => (
                <>
                    <div className="d-flex align-items-center">

                        <h5 className="fs-14 mb-1">
                            {cell.getValue().year}
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
        }
    ],
        []
    );

    const tableData = useMemo(() => {
        return data?.responsibleCourse ?? []
    }, [])

    const table = useReactTable({
        data: tableData,
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
 

        </div>
    )
}

export default EditTeacherResponseCourseTable