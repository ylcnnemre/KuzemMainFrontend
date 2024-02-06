
export interface ICourseType {
    _id: string
    branch: any
    createdAt: string
    updatedAt: string
    description: string
    schedule: any[]
    endDate: string
    files: Array<IFiles>
    quota: number
    startDate: string
    teacher: any
    title: string

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