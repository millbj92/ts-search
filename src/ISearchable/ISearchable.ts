export interface ISearchable<T> {
    search(query?: [key: keyof T, value: unknown][]): T[];
    search(query?: [key: keyof T, value: unknown][], options?: {
        limit?: number;
        offset?: number;
    }): T[];
    search(args?: any): T[];
}