export interface PaginationMeta {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
}
export interface ApiResponse<T> {
    message: string;
    data: T | null;
    meta?: PaginationMeta;
}
