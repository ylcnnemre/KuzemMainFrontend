import React from 'react'
import { Link } from 'react-router-dom'
import "./index.scss"
const CourseDashboard = () => {
    return (
        <div className='course_container mx-2 mt-2'>
            <Link className='btn btn-success px-4 py-1 brans_link' to={"/kurs/ekle"} >
                Kurs Ekle
            </Link>
        </div>
    )
}

export default CourseDashboard