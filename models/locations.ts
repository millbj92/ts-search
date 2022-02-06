import { ISchoolSubject } from "./cetegorical";
import { IStudent, ITeacher } from "./person";

export interface ILocation {
    name: string;
    address: IAddress;
    lat: number;
    lng: number;
}

export interface IAddress {
    street: string;
    city: string;
    state: string;
    postal: string;
    country: string;
}

export interface ISchool extends ILocation {
    students: IStudent[];
    teachers: ITeacher[];
    classes: IClass[];
}

export interface IClass {
    id: number;
    name: string;
    students: IStudent[];
    subject: ISchoolSubject;
    teacher: ITeacher;
}