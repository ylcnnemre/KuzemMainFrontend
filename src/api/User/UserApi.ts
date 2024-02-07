import { AxiosResponse } from "axios"
import { axiosInstance } from "../AxiosInstance"
import { ICreateUserType, IUpdateUserType, IUserData } from "./UserType"

const createUserApi = (data: ICreateUserType) => axiosInstance.post("/user/register", data)

const getUserByIdApi = async (id: string): Promise<AxiosResponse<IUserData>> => axiosInstance.get(`/user/${id}`)

const updateUserApi = async (data: IUpdateUserType) => axiosInstance.put("/user/update", data)

const uploadProfileImgApi = async (data: any): Promise<AxiosResponse<IUserData["profileImg"]>> => axiosInstance.post("/user/upload/profile", data)

const deleteUserApi = (id: string) => axiosInstance.delete(`/user/${id}`)

const getTeacherListApi = (id: string): Promise<AxiosResponse<any[]>> => axiosInstance.get(`/user/teacher/branch/${id}`)

const getStudentListApi = (): Promise<AxiosResponse<IUserData[]>> => axiosInstance.get("/user/all/student")

export {
    getUserByIdApi,
    uploadProfileImgApi,
    getTeacherListApi,
    updateUserApi,
    createUserApi,
    deleteUserApi,
    getStudentListApi
}