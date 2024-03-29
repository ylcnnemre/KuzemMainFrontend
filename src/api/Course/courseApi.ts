import { AxiosResponse } from "axios";
import { axiosInstance } from "../AxiosInstance";
import { ICourseType, ICourseUpdateType, ICreateAnnouncement, IDeleteAnnouncement, IDeleteDocument, IDeletePhoto, IFiles, IUpdateAnnouncement, IUpdateCourseProgram } from "./CourseTypes";


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


const updateCourseProgramApi = (data: IUpdateCourseProgram) => axiosInstance.post("/course/program", data)


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


const courseTeacherListApi = (): Promise<AxiosResponse<ICourseType[]>> => axiosInstance.get("/course/teacher/list")

const joinCourseApi = (id: string) => axiosInstance.post(`/course/join/${id}`)

const createAnnouncementApi = (data: ICreateAnnouncement) => axiosInstance.post("/course/announcement", data)

const updateAnnouncementApi = (data: IUpdateAnnouncement) => axiosInstance.put("/course/announcement", data)

const deleteAnnouncementApi = (data: IDeleteAnnouncement) => axiosInstance.delete("/course/announcement", {
    data: {
        ...data
    }
})

const deleteCourseSendEmailApi = (id: string) => axiosInstance.post(`/course/${id}`)

const deleteCourseApi = (data: { courseId: string, confirmCode: number }) => axiosInstance.delete("/course/delete", {
    data: {
        ...data
    }
})

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
    joinCourseApi,
    courseTeacherListApi,
    updateCourseProgramApi,
    createAnnouncementApi,
    updateAnnouncementApi,
    deleteAnnouncementApi,
    deleteCourseSendEmailApi,
    deleteCourseApi
}