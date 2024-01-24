import { AxiosResponse } from "axios";
import { axiosInstance } from "../AxiosInstance";
import { IGetAllTypes } from "./CourseTypes";


const createCourseApi = (data: FormData) => axiosInstance.post("/course/create", data, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
})

const getAllCourseApi = (): Promise<AxiosResponse<IGetAllTypes[]>> => axiosInstance.get("/course/all")

export {
    createCourseApi,
    getAllCourseApi
}