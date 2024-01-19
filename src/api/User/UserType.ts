import { IBranch } from "../Branch/BranchType"

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
    branch?: IBranch
    profileImg: string,
}



export interface IJwtDecode extends IUser {
    iat: string
    exp: string
}

export interface ICreateStudentType {
    name: string,
    surname: string
    email: string
    tcNo: string,
    phone: string
    birthDate: string
    gender: "erkek" | "kadın",
    password: string
}

export interface ICreateTeacherType extends Omit<ICreateStudentType, "password"> {
    branch: string
}


export interface IUpdateUserType {
    _id: string
    name: string,
    surname: string
    birthDate: string
    gender: string,
    branch? : string,
    address?: {
        city: string
        region: string
        postalCode: number
        additionalInfo: string
    }
}