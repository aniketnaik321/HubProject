export interface IPagedRequest {
    pageNumber: number;
    pageSize: number;
    filterKeys: string;
    filterValues: string;
    filterKeySet?: string[];
    filterValueSet?: string[];
    orderByKey: string;
    sortDirection: number;
  }


  export interface IPagedRequestWithoutFilters {
    pageNumber: number;
    pageSize: number;
    keyId:any;
  }