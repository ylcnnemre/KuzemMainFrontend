
export interface ICreateUserType {
    name: string,
    surname: string,
    tcNo: string,
    email: string,
    phone: string,
    birthDate: string,
    password: string,
    gender: "erkek" | "kadın",
    role: "student" | "teacher" | "admin"
}


export interface IGetUserByIdType extends Omit<ICreateUserType, "password"> {
    address?: any
    _id: string
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