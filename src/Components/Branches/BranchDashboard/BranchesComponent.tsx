import React, { useEffect, useState } from 'react'
import { getAllBranch } from '../../../api/Branch/BranchApi'
import { IBranch } from '../../../api/Branch/BranchType'
import { Button } from 'reactstrap'
import "./index.scss"
import { Link } from 'react-router-dom'
const BranchDashboard = () => {
    const [branch, setBranch] = useState<IBranch[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const branchList = async () => {
        try {
            const branches = await getAllBranch()
            setBranch(branches.data)
        }
        catch (err) {

        }
    }

    useEffect(() => {
        branchList()
    }, [])



    return (
        <div className="table-responsive table-card mx-2 mt-2">
            <div className='createButton_container'>
                <Link className='btn btn-success px-4 py-1' to={"/brans/ekle"} >
                    Branş Ekle
                </Link>
            </div>
            <table className="table align-middle table-nowrap table-striped-columns ">
                <thead className="table-light">
                    <tr>
                        <th scope="col">İsim</th>
                        <th scope="col">Açıklama</th>
                        <th scope="col">Oluşturan</th>
                        <th scope="col">Son Güncelleme</th>
                        <th>İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        branch.map((item, index) => {
                            return (
                                <tr key={`${index}`}>
                                    <td>{item.name} </td>
                                    <td > {item.description}  </td>
                                    <td style={{ textTransform: "capitalize" }}>
                                        {item.createdByUser[0].name}
                                        <span>  </span>
                                        {item.createdByUser[0].surname}
                                    </td>
                                    <td>
                                        {new Date(item.updatedAt).toISOString().split("T")[0]}
                                    </td>
                                    <td>
                                        <Button color='warning' size='sm' >
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

export default BranchDashboard