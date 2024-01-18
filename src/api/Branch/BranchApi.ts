import { AxiosResponse } from "axios";
import { axiosInstance } from "../AxiosInstance";
import { IGetAllBranch } from "./BranchType";


const getAllBranch = (): Promise<AxiosResponse<IGetAllBranch[]>> => axiosInstance.get("/branch/all")


export {
    getAllBranch
}