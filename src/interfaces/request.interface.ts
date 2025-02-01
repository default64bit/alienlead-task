export interface QueryParam {
    search?: string;
    page?: number;
    pp?: number;
    sort_type?: "asc" | "desc";
    sort?: string;
    extraParams?: any;
}
export interface PaginatedResponse<D> {
    records: D[];
    page: number;
    total: number;
    pageTotal: number;
}
