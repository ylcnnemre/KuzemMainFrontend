import { AxiosResponse } from "axios";
import { axiosInstance } from "../AxiosInstance";
import { ISemester, createSemesterRequestDto } from "./SemesterType";


const createSemesterApi = (body: createSemesterRequestDto) => axiosInstance.post("/semester", body)

const getAllSemesterApi = (): Promise<AxiosResponse<ISemester[]>> => axiosInstance.get("/semester/all")

const updateSemesterApi = (body: createSemesterRequestDto & { id: string }) => axiosInstance.put("/semester", body)
export {
    createSemesterApi,
    getAllSemesterApi,
    updateSemesterApi
}