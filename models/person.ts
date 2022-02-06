import { ISchoolSubject } from "./cetegorical";
import { IAddress, IClass } from "./locations";
import { IOrder } from "./products";

export interface IPerson {
    name: string;
    age: number;
    address: IAddress;
    phone?: string;
    email?: string;
}


export interface ICustomer extends IPerson {
    id: number;
    orders: IOrder[];
}

export interface IEmployee extends IPerson {
    salary: number;
    title: string;
}


export interface IManager extends IEmployee {
    employees: IEmployee[];
}

export interface ITeacher extends IPerson {
    subject: ISchoolSubject;
    students: IStudent[];
    classes: IClass[];
}

export interface IStudent extends IPerson {
    gpa: number;
    teacher: ITeacher;
    classes: IClass[];
}