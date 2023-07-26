export interface IPaginator<T = any> {
    items: T[];
    meta: {
        totalItems: number;
        itemCount: number;
        currentPage: number;
        itemsPerPage: number;
        totalPage: number;
    };
}
