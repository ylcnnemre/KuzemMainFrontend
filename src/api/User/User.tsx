import { AxiosResponse } from "axios"
import { axiosInstance } from "../AxiosInstance"
import { ICreateUserType, IGetUserByIdType, IUpdateUserType } from "./Types"


const registerUserApi = (data: ICreateUserType) => {
    return axiosInstance.post("/user/register", data)
}

const getUserByIdApi = async (id: string): Promise<AxiosResponse<IGetUserByIdType>> => axiosInstance.get(`/user/${id}`)

const updateUserApi = async (data: IUpdateUserType) => axiosInstance.put("/user/update", data)

export {
    registerUserApi,
    getUserByIdApi,
    updateUserApi
}