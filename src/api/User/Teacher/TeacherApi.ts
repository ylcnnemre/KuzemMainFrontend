import { AxiosResponse } from "axios";
import { axiosInstance } from "../../AxiosInstance";
import { ITeacherType } from "./teacherType";


const getUserByRoleApi = async (role: "student" | "teacher"): Promise<AxiosResponse<ITeacherType[]>> => axiosInstance.get(`/user/all/${role}`)


export {
    getUserByRoleApi
}