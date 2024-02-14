import React from 'react'
import { PropagateLoader } from 'react-spinners'

const CustomLoader = () => {
    return (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }} >
            <PropagateLoader color="#36d7b7" />
        </div>
    )
}

export default CustomLoader