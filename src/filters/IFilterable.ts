export type FilterValuePair<T> = [
    key: keyof T, 
    value: [value: T[keyof T], enabled: boolean][], 
];
export type Filter<T> = (items: T[], value: FilterValuePair<T>[]) => {
    [key: string]: T[];
};
export interface IFilterable<T> {
    filter(items: T[], values: FilterValuePair<T>[]): T[];
    toUrlParams: (values: FilterValuePair<T>[]) => string;
    getFilterByKey: (key: keyof T, values: FilterValuePair<T>[]) => FilterValuePair<T>[];
    getFilterByKeyAndValue: (key: keyof T, value: T[keyof T], values: FilterValuePair<T>[]) => [value: T[keyof T], enabled: boolean]
}

class FilterItem<T> implements IFilterable<T> {
    filter(items: T[], values: FilterValuePair<T>[]) {
        return values.reduce((acc: T[], curr) => {
                items.filter(item => {
                    curr[1].forEach(([value, enabled]) => {
                        if(enabled === true && !!value) {
                        if (item[curr[0]] === value && !acc.includes(item)) {
                            acc.push(item);
                        }
                    }
                    });
                });
                return acc;
            }, []);
    }

    toUrlParams(values: FilterValuePair<T>[]) {
        return values.reduce((acc: string, curr) => {
            curr[1].forEach(([value, enabled]) => {
                if(enabled === true) {
                acc += `${curr[0]}=${value}&`;
            }
            });
            return new URLSearchParams(acc).toString();
        }, "");
    }

    getFilterByKey(key: keyof T,  values: FilterValuePair<T>[]): FilterValuePair<T>[] {
        return values.filter(value => value[0] === key);
    };

    getFilterByKeyAndValue(key: keyof T, keyval: T[keyof T], values: FilterValuePair<T>[]): [value: T[keyof T], enabled: boolean] {
       const keys = values.filter(value => value[0] === key)
         return keys.reduce((acc: [value: T[keyof T], enabled: boolean], curr) => {
            curr[1].forEach(([value, enabled]) => {
                if(value === keyval) {
                    acc = [value, enabled];
                }
            });
            return acc;
        }, [keyval, false]);
    };
}

export class FilterHandler {
   private static _instance: FilterHandler;
   public static get instance(): FilterHandler {
       if(!this._instance) {
           this._instance = new FilterHandler();
       }
       return this._instance;
   }
   private _currentFilter: IFilterable<unknown> | undefined;
   public get currentFilter(): IFilterable<unknown> | undefined {
         return this._currentFilter;
   }
   private set currentFilter(filter: IFilterable<unknown> | undefined) {
        this._currentFilter = filter;
   }

   private constructor() {
     FilterHandler._instance = this;
   }
   public static newFilter<T> (): FilterItem<T>  {
        (this.instance.currentFilter as FilterItem<T>) = new FilterItem<T>();
        return new FilterItem<T>();
   };
}