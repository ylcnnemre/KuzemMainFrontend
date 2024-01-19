import { IUser } from "../User/UserType"

export interface IBranch {
    _id: string
    name: string
    description: string
    createdAt: string
    updatedAt: string
    createdByUser: IUser[]
    uptadedByUser: IUser[]
}

export interface ICreateBranch {
    name: string
    description: string
}