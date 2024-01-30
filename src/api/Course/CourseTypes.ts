
export interface ICourseType {
    _id: string
    title: string
    branch: any
    endDate: string
    startDate: string
    teacher: ITeacher
    quota: number,
    description: string,
    schedule: Array<any>
    photos: Array<IPhoto>,
    documents: Array<IDocument>
    createdAt: string
    updatedAt: string
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