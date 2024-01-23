import { axiosInstance } from "../AxiosInstance";


const createCourseApi = (data: FormData) => axiosInstance.post("/course/create", data,{
    headers : {
        "Content-Type" : "multipart/form-data"
    }
})


export {
    createCourseApi
}