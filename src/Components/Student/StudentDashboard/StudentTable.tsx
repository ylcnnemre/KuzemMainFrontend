import React, { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { CardBody, Col, Row, Table } from 'reactstrap'
import { Column, Table as ReactTable, ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, FilterFn } from "@tanstack/react-table"
import { rankItem } from '@tanstack/match-sorter-utils';
const DebouncedInput = ({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
}: {
    value: string | number;
    onChange: (value: string | number) => void;
    debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) => {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value);
        }, debounce);

        return () => clearTimeout(timeout);
    }, [debounce, onChange, value]);

    return (
        <input {...props} value={value} className="form-control" onChange={e => setValue(e.target.value)} />
    );
};

const ProductsGlobalFilter = () => {
    return (
        <React.Fragment>
            <div className="col-sm-auto ms-auto">
                <div>
                    <Link
                        to="/ogrenci/ekle"
                        className="btn btn-primary"
                    >
                        Öğrenci Ekle
                    </Link>
                </div>
            </div>
        </React.Fragment>
    );
};



interface IStudentTableProps {
    isGlobalFilter: boolean
    isStudentsFilter: boolean
    columns: any,
    data: any[]
}


const StudentTable: FC<IStudentTableProps> = ({ isGlobalFilter, isStudentsFilter, columns, data }) => {
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
        const itemRank = rankItem(row.getValue(columnId), value);
        addMeta({
            itemRank
        });
        return itemRank.passed;
    };
    const table = useReactTable({
        columns,
        data: data,
        initialState: {
            pagination: {
                pageSize: 8
            }
        },
        state: {
            columnFilters,
            globalFilter,
        },
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        globalFilterFn: fuzzyFilter,
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel()
    })
    const {
        getHeaderGroups,
        getRowModel,
        setPageSize,
    } = table
    return (
        <>
            {isGlobalFilter && <Row className="mb-3">
                <CardBody className="border border-dashed border-end-0 border-start-0">
                    <form>
                        <Row>
                            <Col sm={5}>
                                <div className={(isStudentsFilter) ? " d-inline-block" : "  d-inline-block col-12"}>
                                    <DebouncedInput
                                        value={globalFilter ?? ''}
                                        onChange={value => setGlobalFilter(String(value))}
                                        placeholder={"Öğrenci Ara"}
                                    />

                                </div>
                            </Col>
                            {isStudentsFilter && (
                                <ProductsGlobalFilter />
                            )}

                        </Row>
                    </form>
                </CardBody>
            </Row>}
            <div className={"table-responsive mb-1"}>
                <Table hover className={"mb-0 align-middle table-borderless"}>
                    <thead className={"table-light text-muted"}>
                        {getHeaderGroups().map((headerGroup: any) => (
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
                        {getRowModel().rows.map((row: any) => {
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
                    <div style={{display:"flex",flexDirection:"row-reverse",justifyContent:"space-between"}} >
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
                                style={{padding:"3px",marginRight:"5px"}}
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
                                style={{padding:"3px",marginLeft:"5px"}}
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                <span >{'>'}</span>
                            </button>

                        </div>
                    </div>
                }

            </div>
        </>
    )
}

export default StudentTable