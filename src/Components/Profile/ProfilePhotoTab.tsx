import React, { FC, useMemo } from 'react'
import { Card, CardBody, Col, Input, Label } from 'reactstrap'
import aykut from "../../assets/images/aykut.jpg";
import useUserStore from '../../zustand/useUserStore';
import { uploadProfileImgApi } from '../../api/User/UserApi';
import { toast } from 'react-toastify';
import { IoCamera } from 'react-icons/io5';
import { IUserData } from '../../api/User/UserType';

const ProfilePhotoTab: FC<{ user: IUserData, setUser: React.Dispatch<React.SetStateAction<IUserData | undefined>> }> = ({ user, setUser }) => {

    console.log("user ==>", user)
    const handleFileChange = async (event: any) => {
        const file = event.target.files[0]
        if (file) {
            const formData = new FormData()
            formData.append("file", file)
            try {
                let response = await uploadProfileImgApi(formData)
                if (response.data) {
                    setUser({
                        ...user,
                        profileImg: {
                            ...response.data
                        }
                    })
                }

            }
            catch (err: any) {
                console.log("err ==>", err)
                toast.error(err.response.data.message, {
                    autoClose: 2000
                })
            }
        }
    }

    const profileImg = useMemo(() => {
        return user.profileImg ? `${import.meta.env.VITE_BASEURL}${user.profileImg.path}` : aykut
    }, [user])

    return (
        <Card className="card-bg-fill">
            <CardBody className="p-4">
                <div className="text-center">
                    <div className="profile-user position-relative d-inline-block mx-auto  mb-4">
                        <img src={profileImg}
                            className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                            alt="user-profile" />
                        <div className="avatar-xs p-0 rounded-circle profile-photo-edit">
                            <Input id="profile-img-file-input" type="file"
                                className="profile-img-file-input" onChange={handleFileChange} />
                            <Label htmlFor="profile-img-file-input"
                                className="profile-photo-edit avatar-xs">
                                <span className="avatar-title rounded-circle bg-light text-body">
                                    <IoCamera />
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