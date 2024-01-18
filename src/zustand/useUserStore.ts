
import { create } from 'zustand'
import { jwtDecode } from "jwt-decode"
import { IJwtDecode, IUser } from '../api/User/UserType';


interface UserState {
    user: IUser;
    isLoggedIn: boolean,
    setUser: (data: IUser) => void;
    loginSuccess: (user: any, navigate: any) => void;
    logoutUserSuccess: () => void;
}

const decodeToken = () => {
    const { iat, exp, ...rest } = jwtDecode<IJwtDecode>(JSON.stringify(localStorage.getItem("token")))
    return rest
}

const useUserStore = create<UserState>((set) => ({
    user: localStorage.getItem("token") ? decodeToken() : {
        _id: "",
        surname: "",
        address: "",
        birthDate: "",
        email: "",
        phone: "",
        gender: "erkek",
        role: "student",
        profileImg: "",
        name: "",
        tcNo: ""
    },
    isLoggedIn: localStorage.getItem("token") ? true : false,
    setUser: (data) => {
        console.log("dataaaSett==>", data)
        set(() => ({
            user: data
        }))
    },

    loginSuccess: (token, navigate) => {
        console.log("tokenn ==>", token)
        localStorage.setItem("token", token.accessToken)
        const decodeJwt: IJwtDecode = jwtDecode(JSON.stringify(token.accessToken))
        const { iat, exp, ...restDecode } = decodeJwt
        set(() => ({
            user: decodeJwt,
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
