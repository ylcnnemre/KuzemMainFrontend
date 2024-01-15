import { axiosInstance } from "./AxiosInstance"

interface ILogin {
    email: string
    password: string
}

const loginApi = async (data: ILogin) => axiosInstance.post("/auth/login", data)


export {
    loginApi,
}