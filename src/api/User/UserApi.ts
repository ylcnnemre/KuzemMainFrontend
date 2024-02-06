import { AxiosResponse } from "axios"
import { axiosInstance } from "../AxiosInstance"
import { ICreateUserType, ICreateTeacherType, IUpdateUserType, IProfileData } from "./UserType"


const createStudentApi = (data: ICreateUserType) => {
    return axiosInstance.post("/user/register/student", data)
}

const createTeacherApi = (data: ICreateTeacherType) => {
    return axiosInstance.post("/user/register/teacher", data)
}


const createUserApi = (data: ICreateUserType) => axiosInstance.post("/user/register", data)

const getUserByIdApi = async (id: string): Promise<AxiosResponse<IProfileData>> => axiosInstance.get(`/user/${id}`)

const updateUserApi = async (data: IUpdateUserType) => axiosInstance.put("/user/update", data)

const uploadProfileImgApi = async (data: any): Promise<AxiosResponse<{ path: string }>> => axiosInstance.post("/user/upload/profile", data)

const deleteUserApi = (id: string) => axiosInstance.delete(`/user/${id}`)

const getTeacherListApi = (id: string): Promise<AxiosResponse<any[]>> => axiosInstance.get(`/user/teacher/branch/${id}`)

export {
    createStudentApi,
    createTeacherApi,
    getUserByIdApi,
    uploadProfileImgApi,
    getTeacherListApi,
    updateUserApi,
    createUserApi,
    deleteUserApi
}