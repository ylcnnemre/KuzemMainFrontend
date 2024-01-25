import { AxiosResponse } from "axios";
import { axiosInstance } from "../AxiosInstance";
import { ICourseType } from "./CourseTypes";


const createCourseApi = (data: FormData) => axiosInstance.post("/course/create", data, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
})

const getAllCourseApi = (): Promise<AxiosResponse<ICourseType[]>> => axiosInstance.get("/course/all")

const getDetailCourseApi = (id: string): Promise<AxiosResponse<ICourseType>> => axiosInstance.get(`/course/${id}`)

export {
    createCourseApi,
    getAllCourseApi,
    getDetailCourseApi
}