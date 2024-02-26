import { ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import React, { FC, useMemo, useState } from 'react'
import { ICourseType } from '../../../api/Course/CourseTypes';
import { Button, Table } from 'reactstrap';
import { FiEdit } from 'react-icons/fi';
import { BsTrash } from 'react-icons/bs';

const AnnouncementTable: FC<{ data: ICourseType["announcement"] }> = ({ data }) => {
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    console.log("ad =<",data)
    const tableData = useMemo(() => {
        return data
    }, [data])

    const columns = useMemo(() => [
        {
            header: "başlık",
            accessorKey: "title",
        },
        {
            header: "İçerik",
            accessorKey: "content",
        },
        {
            header: "Oluşturulma zamanı",
            accessorKey: "createdAt",
            cell: (cell: any) => {
                return (
                    <p>
                        {new Date(cell.getValue()).toLocaleString()}
                    </p>
                )
            }
        },
        {
            header: "Action",
            accessorKey: "_id",
            cell: (cell: any) => {

                return (
                    <div>
                        <Button color='danger' style={{ marginRight: "30px" }} onClick={() => {
                            const selectedElement = tableData.find(el => el._id == cell.getValue())
                            /*  setInitialData({
                                 content: selectedElement?.content,
                                 title: selectedElement?.title,
                                 announcementId: selectedElement?._id
                             })
                             setDeleteModal(true) */
                        }} >  <BsTrash />
                        </Button>
                        <Button color='warning' style={{ marginRight: "30px" }} onClick={() => {
                            const selectedElement = tableData.find(el => el._id == cell.getValue())
                            console.log("asdv123=>", selectedElement)
                            /*  setInitialData({
                                 content: selectedElement?.content,
                                 title: selectedElement?.title,
                                 announcementId: selectedElement?._id
                             })
 
                             setModalShow(true) */
                        }} >
                            <FiEdit />
                        </Button>
                    </div>
                )

            },
        },
    ],
        [tableData]
    );

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
                pageSize: 6
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
                            <tr >
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

            <div style={{ display: "flex", flexDirection: "row-reverse", justifyContent: "space-between" }} >
                <div >
                    <span className="mx-2">Sayfa Başına Kayıt</span>
                    <select

                        value={table.getState().pagination.pageSize}
                        onChange={(e) => {
                            table.setPageSize(Number(e.target.value));
                        }}
                    >
                        {[2, 4, 6].map((pageSize) => (
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


        </div>
    )
}

export default AnnouncementTable