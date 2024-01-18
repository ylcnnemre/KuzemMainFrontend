import { AxiosResponse } from "axios"
import { axiosInstance } from "../AxiosInstance"
import { ICreateUserType, IUpdateUserType, IUser } from "./UserType"


const registerUserApi = (data: ICreateUserType) => {
    return axiosInstance.post("/user/register", data)
}

const getUserByIdApi = async (id: string): Promise<AxiosResponse<IUser>> => axiosInstance.get(`/user/${id}`)

const updateUserApi = async (data: IUpdateUserType) => axiosInstance.put("/user/update", data)

const uploadProfileImgApi = async (data: any): Promise<AxiosResponse<{ path: string }>> => axiosInstance.post("/user/upload", data)

export {
    registerUserApi,
    getUserByIdApi,
    updateUserApi,
    uploadProfileImgApi
}