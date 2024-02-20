import React, { FC } from 'react'
import { Col } from 'reactstrap'

const DetailWidget: FC<{ icon: React.ReactNode, title: string, value: any, onClick?: () => void }> = ({ icon, title, value, onClick }) => {
    return (

        <div className="p-2 border border-dashed rounded " style={{ cursor: onClick ? "pointer" : "default" }} onClick={onClick}>
            <div className="d-flex align-items-center">
                <div className="avatar-sm me-2">
                    <div className="avatar-title rounded bg-transparent text-primary fs-24">
                        {icon}
                    </div>
                </div>
                <div className="flex-grow-1" style={{ overflow: "hidden" }}>
                    <p className="text-muted mb-1">
                        {title}
                    </p>
                    <h6 className="mb-0 " style={{ textTransform: "capitalize" }} >
                        {value}
                    </h6>
                </div>
            </div>
        </div>

    )
}

export default DetailWidget