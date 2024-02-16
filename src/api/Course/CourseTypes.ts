import { IUserData } from "../User/UserType"

export interface ICourseType {
    _id: string
    branch: {
        _id: string
        name: string
        description: string
        createdBy: any
        updatedBy: any
        createdAt: string
        updatedAt: string
    },
    createdAt: string
    updatedAt: string
    description: string
    schedule: any[]
    endDate: string
    files: Array<IFiles>
    quota: number
    startDate: string
    teacher: IUserData
    title: string
    semester: {
        active: boolean,
        description: string
        name: string
        period: string
        year: number
        _id: string
        createdAt: string
        updatedAt: string
    },
    active: "aktif" | "pasif"
    joinUserList?: any[]
}

export interface ICourseUpdateType {
    courseId: string
    branch: string
    description: string
    endDate: string
    quota: number
    startDate: string
    teacher: string
    title: string
}


export interface IFiles {
    _id: string
    path: string
    name: string
    extension: string
    createdBy: {
        _id: string
        name: string
        surname: string
    },
    type: "photo" | "document"
    createdAt: string
    updatedAt: string
}

export interface IDeletePhoto {
    imgName: string
    courseId: string
    imgId: string
}

export interface IDeleteDocument {
    documentName: string
    courseId: string
    documentId: string
}