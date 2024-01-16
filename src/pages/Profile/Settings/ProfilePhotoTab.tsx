import React from 'react'
import { Card, CardBody, Col, Input, Label } from 'reactstrap'
import avatar1 from "../../../assets/images/users/avatar-1.jpg";
import useUserStore from '../../../zustand/useUserStore';

const ProfilePhotoTab = () => {
    const { user } = useUserStore()
    return (

        <Card className="card-bg-fill">
            <CardBody className="p-4">
                <div className="text-center">
                    <div className="profile-user position-relative d-inline-block mx-auto  mb-4">
                        <img src={avatar1}
                            className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                            alt="user-profile" />
                        <div className="avatar-xs p-0 rounded-circle profile-photo-edit">
                            <Input id="profile-img-file-input" type="file"
                                className="profile-img-file-input" />
                            <Label htmlFor="profile-img-file-input"
                                className="profile-photo-edit avatar-xs">
                                <span className="avatar-title rounded-circle bg-light text-body">
                                    <i className="ri-camera-fill"></i>
                                </span>
                            </Label>
                        </div>
                    </div>
                    <h5 className="fs-16 mb-1">
                        {user.name}
                    </h5>

                </div>
            </CardBody>
        </Card>

    )
}

export default ProfilePhotoTab