import { json } from 'stream/consumers';
import { create } from 'zustand'

// User state interface
interface UserState {
    user: object;
    error: string;
    loading: boolean;
    isUserLogout: boolean;
    errorMsg: boolean;
    apiError: (data: any) => void;
    loginSuccess: (user: object, navigate: any) => void;
    logoutUserSuccess: () => void;
    resetLoginFlag: () => void;
}

// Zustand store
const useUserStore = create<UserState>((set) => ({
    user: {},
    error: "",
    loading: false,
    isUserLogout: false,
    errorMsg: false,

    apiError: (data) =>
        set(() => ({
            error: data,
            loading: true,
            isUserLogout: false,
            errorMsg: true,
        })),

    loginSuccess: (user, navigate) => {
        localStorage.setItem("authUser", JSON.stringify(user))
        set(() => ({
            user: user,
            loading: false,
            errorMsg: false,
        }))
        navigate("/dashboard")
    }
    ,

    logoutUserSuccess: () =>
        set(() => ({
            isUserLogout: true,
        })),

    resetLoginFlag: () =>
        set(() => ({
            error: "",
            loading: false,
            errorMsg: false,
        })),
}));

export default useUserStore;
