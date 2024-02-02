import { IBranch } from "../Branch/BranchType"


export interface IJwtDecode {
    _id: string,
    name: string,
    surname: string
    email: string
    role: "student" | "teacher" | "admin"
    iat: string
    exp: string
}

export interface IProfileData {
    _id: string
    name: string
    surname: string
    email: string
    gender: string
    phone: string
    role: string
    tcNo: string
    birthDate: string,
    branch?: any
    address?: {
        _id: string
        city: string
        createdAt: string
        updatedAt: string
        postalCode: string
        additionalInfo: string
        region: string
    },
    profileImg?: {
        path: string
    }
}




export interface ICreateUserType {
    name: string,
    surname: string
    password?: string
    tcNo: string,
    email: string
    role: string
    phone: string
    birthDate: string
    gender: "erkek" | "kadın",
    branch?: string
}

export interface ICreateTeacherType extends Omit<ICreateUserType, "password"> {
    branch: string
}


export interface IUpdateUserType {
    _id: string
    name: string,
    surname: string
    birthDate: string
    gender: string,
    branch?: string,
    address?: {
        city: string
        region: string
        postalCode: number
        additionalInfo: string
    }
}