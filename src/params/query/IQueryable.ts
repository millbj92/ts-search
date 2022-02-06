type QueryParams<T> = [keyof T, T[keyof T]][];

export interface IQueryable<T> {
    toUrl: () => string;
}

export class QueryItem<T> implements IQueryable<T> {
    private _values: Map<keyof T, T[keyof T]>;
    
    constructor(values: T) {
        this._values = new Map(Object.entries(values)) as Map<keyof T, T[keyof T]>;
    }

    get(key: keyof T): T[keyof T] | undefined {
            return this._values.get(key);
    }

    getAll(): T {
        return Object.fromEntries(this._values) as unknown as T;
    }

    set(key: keyof T, value: T[keyof T]) {
        this._values.set(key, value);
    }

    toUrl(): string {
        return new URLSearchParams([...Object.entries(this.getAll())]).toString();
    }
}