export type IFilterOptions<T, B = {}> = {
    [P in keyof T]?: T[P];
}
    &
{
    [P in keyof B]?: B[P];
} & {
    direction?: "ASC" | "DESC";
    sort?: string;
    page?: number;
    limit?: FiltroLimit;
    text?: string;
};
export type FiltroLimit = number | "todos" | "all" ;
