
export interface ICreateUserType {
    name: string,
    surname: string,
    tcNo: string,
    email: string,
    phone : string,
    birthDate: string,
    password: string,
    gender: "erkek" | "kadın",
    role: "student" | "teacher" | "admin"
}


export interface IGetUserByIdType extends ICreateUserType {
    address?: any
    _id: string
}