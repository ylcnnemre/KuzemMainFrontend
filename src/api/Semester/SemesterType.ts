

export interface createSemesterRequestDto {
    name: string
    description: string
    period: string
    year: number
    active: boolean
}


export interface ISemester {
    _id: string
    name: string
    period: string
    year: number
    active: boolean,
    description: number
    createdAt: string
    updatedAt: string
}