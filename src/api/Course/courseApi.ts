import { AxiosResponse } from "axios";
import { axiosInstance } from "../AxiosInstance";
import { ICourseType, IDeletePhoto } from "./CourseTypes";


const createCourseApi = (data: FormData) => axiosInstance.post("/course/create", data, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
})

const getAllCourseApi = (): Promise<AxiosResponse<ICourseType[]>> => axiosInstance.get("/course/all")

const getDetailCourseApi = (id: string): Promise<AxiosResponse<ICourseType>> => axiosInstance.get(`/course/${id}`)

const deletePhotoApi = (data: IDeletePhoto) => axiosInstance.delete(`/course/photo`, {
    data: {
        ...data
    }
})

const addPhotoApi = (data: FormData): Promise<AxiosResponse<string[]>> => axiosInstance.post("/course/photo", data, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
})

export {
    createCourseApi,
    getAllCourseApi,
    getDetailCourseApi,
    deletePhotoApi,
    addPhotoApi
}