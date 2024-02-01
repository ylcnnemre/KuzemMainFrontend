import React, { useEffect, useMemo, useState } from 'react'
import { Button, Table } from 'reactstrap'
import { Link, useNavigate } from "react-router-dom"
import { getUserByRoleApi } from '../../../api/User/UserApi'
import { IUser } from '../../../api/User/UserType'
import "./index.scss"
import { ColumnDef, ColumnFiltersState, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'

const TeacherDashboard = () => {
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [teacher, setTeachers] = useState<IUser[]>([])
    const navigate = useNavigate()

    const getAllTeacher = async () => {
        const response = await getUserByRoleApi("teacher")
        console.log("response ==>", response)
        setTeachers(response.data)
    }

    useEffect(() => {
        getAllTeacher()
    }, [])


    const editTeacher = (id: string) => {
        navigate(`/egitmen/duzenle/${id}`)
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
            }
        ]
    }, [])

    const data = useMemo(() => {
        return teacher.map(item =>{
            return {

            }
        })

    }, [])

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
        <div className="table-responsive mx-2 mt-2">
            <div className='createTeacherButton_container'>
                <Link to={"/egitmen/ekle"} className='btn btn-success px-4 py-1'>
                    Eğitmen Ekle
                </Link>

            </div>
            <table className="table align-middle table-nowrap table-striped-columns ">
                <thead className='table-light'>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">İsim</th>
                        <th scope="col">Soyisim</th>
                        <th scope='col'>Branş</th>
                        <th scope="col">Email</th>
                        <th scope="col">Telefon</th>
                        <th scope='col'>İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        teacher.map((item, index) => {
                            return (
                                <tr key={`${index}`} >
                                    <td className="fw-medium">{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.surname}</td>
                                    <td>{item.branch?.name}  </td>
                                    <td>{item.email} </td>
                                    <td> {item.phone} </td>
                                    <td>
                                        <Button color='warning' size='sm' onClick={() => {
                                            editTeacher(item._id)
                                        }} >
                                            Düzenle
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>

    )
}

export default TeacherDashboard

/* 12345*Abcd */

/* wget -qO- https://ubuntu.bigbluebutton.org/bbb-install-2.5.sh | sudo bash -s -- -v focal-250 -s 164.90.185.42 -e yalcnnemre@gmail.com  -a -w -g */