import { AxiosResponse } from "axios"
import { axiosInstance } from "../AxiosInstance"
import { ICreateUserType, IGetUserByIdType } from "./Types"


const registerUserApi = (data: ICreateUserType) => {
    return axiosInstance.post("/user/register", data)
}

const getUserByIdApi = async (id: string): Promise<AxiosResponse<IGetUserByIdType>> => axiosInstance.get(`/user/${id}`)

export {
    registerUserApi,
    getUserByIdApi
}