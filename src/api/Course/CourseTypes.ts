
export interface ICourseType {
    _id: string
    branch: any
    createdAt: string
    updatedAt: string
    description: string
    schedule: any[]
    endDate: string
    files: Array<{
        createdAt: string
        createdBy: any
        extension: string,
        path: string,
        name: string
        type: string
        updatedAt: string
        _id: string
    }>
    quota: number
    startDate: string
    teacher: any
    title: string

}

export interface IPhoto {
    _id: string
    path: string
    name: string
    extension: string
    createdBy: {
        _id: string
        name: string
        surname: string
    },
    createdAt: string
    updatedAt: string
}
export interface IDocument {
    _id: string
    path: string
    extension: string
    name: string
    createdBy: {
        _id: string
        name: string
        surname: string
    }
    createdAt: string
    updatedAt: string

}

interface ITeacher {
    _id: string
    name: string
    surname: string
    gender: string
    profileImg: string
    role: string
}


interface IBranch {
    _id: string
    name: string
    description: string
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