
export interface ICourseType {
    _id: string
    title: string
    branch: string | IBranch
    endDate: string
    startDate: string
    teacher: ITeacher
    quota: number,
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