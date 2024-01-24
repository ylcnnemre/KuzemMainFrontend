
export interface IGetAllTypes {
    _id: string
    title: string
    branch: string
    endDate: string
    startDate: string
    teacher: teacher
    quote: number,
    schedule: Array<any>
    photos: Array<string>
    createdAt: string
    updatedAt: string
}

interface teacher {
    _id: string
    name: string
    surname: string
    email: string
    birthDate: string
    gender: string
    profileImg: string
    role: string
    createdAt: string
    updatedAt: string
}