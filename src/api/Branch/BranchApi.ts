import { AxiosResponse } from "axios";
import { axiosInstance } from "../AxiosInstance";
import { ICreateBranch, IBranch } from "./BranchType";


const getAllBranch = (): Promise<AxiosResponse<IBranch[]>> => axiosInstance.get("/branch/all")

const createBranch = (data: ICreateBranch) => axiosInstance.post("/branch/create",data)

export {
    getAllBranch,
    createBranch
}