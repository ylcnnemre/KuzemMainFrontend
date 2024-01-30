import { AxiosResponse } from "axios";
import { axiosInstance } from "../AxiosInstance";
import { ICourseType, IDeleteDocument, IDeletePhoto, IPhoto } from "./CourseTypes";


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

const deleteDocumentApi = (data: IDeleteDocument) => axiosInstance.delete("/course/document", {
    data: {
        ...data
    }
})

const addPhotoApi = (data: FormData): Promise<AxiosResponse<{ _id: string, photos: IPhoto[] }>> => axiosInstance.post("/course/photo", data, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
})


const addDocumentApi = (data: FormData): Promise<AxiosResponse<{ _id: string, documents: IPhoto[] }>> => axiosInstance.post("/course/document", data, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
})


export {
    createCourseApi,
    getAllCourseApi,
    getDetailCourseApi,
    deletePhotoApi,
    addPhotoApi,
    deleteDocumentApi,
    addDocumentApi
}