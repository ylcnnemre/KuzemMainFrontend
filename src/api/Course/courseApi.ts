import { AxiosResponse } from "axios";
import { axiosInstance } from "../AxiosInstance";
import { ICourseType, ICourseUpdateType, IDeleteDocument, IDeletePhoto, IFiles } from "./CourseTypes";


const createCourseApi = (data: FormData) => axiosInstance.post("/course/create", data, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
})

const updateCourseApi = (data: ICourseUpdateType) => axiosInstance.put("/course", data)


const getAllCourseByStatusApi = (status: "aktif" | "pasif"): Promise<AxiosResponse<ICourseType[]>> => axiosInstance.get(`/course/all/${status}`)

const getDetailCourseApi = (id: string): Promise<AxiosResponse<ICourseType>> => axiosInstance.get(`/course/${id}`)

const deletePhotoApi = (data: IDeletePhoto) => axiosInstance.delete(`/course/photo`, {
    data: {
        ...data
    }
})

const deleteDocumentApi = (data: IDeleteDocument) => axiosInstance.delete("/course/document", {
    data: {
        ...data
    }
})

const addPhotoApi = (data: FormData): Promise<AxiosResponse<{ _id: string, files: IFiles[] }>> => axiosInstance.post("/course/photo", data, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
})


const addDocumentApi = (data: FormData): Promise<AxiosResponse<{ _id: string, files: IFiles[] }>> => axiosInstance.post("/course/document", data, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
})


const deleteEnrollerUserApi = (data: { userId: string, courseId: string }) => axiosInstance.delete("/course/enrolleduser", {
    data: {
        ...data
    }
})



const joinCourseApi = (id: string) => axiosInstance.post(`/course/join/${id}`)

export {
    createCourseApi,
    deleteEnrollerUserApi,
    getAllCourseByStatusApi,
    getDetailCourseApi,
    deletePhotoApi,
    addPhotoApi,
    deleteDocumentApi,
    addDocumentApi,
    updateCourseApi,
    joinCourseApi
}