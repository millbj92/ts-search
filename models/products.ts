import { IProductCategory } from "./cetegorical";

export interface IProduct {
    id: number;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    categories: IProductCategory[];
}

export interface IInventoryItem {
    id: number;
    product: IProduct;
    quantity: number;
}

export interface IOrder {
    id: number;
    customer: string;
    items: IInventoryItem[];
}

export interface ISalesReport {
    id: number;
    date: Date;
    total: number;
    soldItems: IInventoryItem[];
    topItems: IInventoryItem[];
    trendingItems: IInventoryItem[];
}