import { AxiosResponse } from "axios"
import { axiosInstance } from "../AxiosInstance"
import { ICreateStudentType, ICreateTeacherType, IUpdateUserType, IUser } from "./UserType"


const createStudentApi = (data: ICreateStudentType) => {
    return axiosInstance.post("/user/register/student", data)
}

const createTeacherApi = (data: ICreateTeacherType) => {
    return axiosInstance.post("/user/register/teacher", data)
}

const getUserByIdApi = async (id: string): Promise<AxiosResponse<IUser>> => axiosInstance.get(`/user/${id}`)

const updateUserApi = async (data: IUpdateUserType) => axiosInstance.put("/user/update", data)

const uploadProfileImgApi = async (data: any): Promise<AxiosResponse<{ path: string }>> => axiosInstance.post("/user/upload/profile", data)

const getUserByRoleApi = async (role: "student" | "teacher"): Promise<AxiosResponse<IUser[]>> => axiosInstance.get(`/user/all/${role}`)

const getTeacherListApi = (id: string): Promise<AxiosResponse<IUser[]>> => axiosInstance.get(`/user/teacher/branch/${id}`)

export {
    createStudentApi,
    createTeacherApi,
    getUserByIdApi,
    uploadProfileImgApi,
    getUserByRoleApi,
    getTeacherListApi,
    updateUserApi
}