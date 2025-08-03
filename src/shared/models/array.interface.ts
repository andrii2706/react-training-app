export interface ApiArrInterface<T> {
    info: PaginationInfoInterface,
    results: T[]
}

export interface PaginationInfoInterface 
{
        count: number, 
        pages: number, 
        next: string,
        prev: string | null
    }
