
import { create } from 'zustand'
import { jwtDecode } from "jwt-decode"

interface IUser {
    _id: string,
    name: string,
    email: string
    tcNo: string,
    birthDate: string
    gender: "erkek" | "kadın",
    role: "student" | "teacher" | "admin"
    address: any,
    iat: any,
    exp: any
}

// User state interface
interface UserState {
    user: IUser;
    isLoggedIn: boolean,
    setUser: (data: IUser) => void;
    loginSuccess: (user: any, navigate: any) => void;
    logoutUserSuccess: () => void;
}

// Zustand store
const useUserStore = create<UserState>((set) => ({
    user: localStorage.getItem("token") ? jwtDecode(JSON.stringify(localStorage.getItem("token"))) : {
        _id: "",
        address: "",
        birthDate: "",
        email: "",
        exp: "",
        gender: "erkek",
        role: "student",
        iat: "",
        name: "",
        tcNo: ""
    },
    isLoggedIn: localStorage.getItem("token") ? true : false,
    setUser: (data) => {
        set(() => ({
            user: data
        }))
    },

    loginSuccess: (token, navigate) => {
        console.log("tokenn ==>", token)
        localStorage.setItem("token", token.accessToken)
        const decoded: IUser = jwtDecode(JSON.stringify(token.accessToken))
        set(() => ({
            user: decoded,
            isLoggedIn: true
        }))
        navigate("/dashboard")
    },
    logoutUserSuccess: () => {
        localStorage.removeItem("token")
        set(() => ({
            isLoggedIn: false
        }))
    },

}));

export default useUserStore;
