import axios from "axios"
import { toast } from "react-toastify"
import swr from "swr"
const baseURL = import.meta.env.VITE_BASEURL

const axiosInstance = axios.create({
    baseURL
})

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

axiosInstance.interceptors.response.use((response) => response, (error) => {
    return Promise.reject(error)
})

const fetcher = (url: string) => axiosInstance.get(url).then(res => res.data);

export { axiosInstance, fetcher }