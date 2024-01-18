export interface IUser {
    _id: string,
    name: string,
    surname: string
    email: string
    phone: string,
    tcNo: string,
    birthDate: string
    gender: "erkek" | "kadın",
    role: "student" | "teacher" | "admin"
    address: any,
    profileImg: string,
}

export interface IJwtDecode extends IUser {
    iat: string
    exp: string
}

export interface ICreateUserType {
    name: string,
    surname: string
    email: string
    tcNo: string,
    phone: string
    birthDate: string
    gender: "erkek" | "kadın",
    role: "student" | "teacher" | "admin"
    password: string
}


export interface IUpdateUserType {
    _id: string
    name: string,
    surname: string
    birthDate: string
    gender: string,
    address?: {
        city: string
        region: string
        postalCode: number
        additionalInfo: string
    }
}