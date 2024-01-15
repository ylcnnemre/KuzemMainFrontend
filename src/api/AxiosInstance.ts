import axios from "axios"

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
/*     if (error?.response?.status == 401) {
        localStorage.removeItem("token")
        window.location.href = "/giris"
    } */
    try {

    }
    catch (err) {

    }

    return Promise.reject(error)
})

export { axiosInstance }