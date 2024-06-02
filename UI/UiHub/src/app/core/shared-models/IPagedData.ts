export interface IPagedData<T>{
    pageNumber: number;
    totalCount: number;
    pageSize: number;
    totalPages: number;
    data:T[]
}