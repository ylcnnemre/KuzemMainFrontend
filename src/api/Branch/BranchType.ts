import { IUser } from "../User/UserType"

export interface IGetAllBranch {
    _id: string
    name: string
    description: string
    createdAt: string
    updatedAt: string
    createdByUser: IUser[]
    uptadedByUser: IUser[]
}