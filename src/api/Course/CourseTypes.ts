
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
    photos: Array<string>,
    documents: Array<string>
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