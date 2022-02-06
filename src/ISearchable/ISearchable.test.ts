import { ISearchable } from './ISearchable';
import { IAddress } from "../../models/locations";
import { IPerson } from '../../models/person';

const personList: IPerson[] = [
    {
        name: "John",
        age: 30,
        address: {
            street: "123 Main St",
            city: "Anytown",
            state: "CA",
            postal: "12345",
            country: "USA"
        }
    },
    {
        name: "Jane",
        age: 25,
        address: {
            street: "456 Main St",
            city: "Anytown",
            state: "CA",
            postal: "12345",
            country: "USA"
        }
            
    },
    {
        name: "Joe",
        age: 20,
        address: {
            street: "789 Main St",
            city: "Anytown",
            state: "CA",
            postal: "12345",
            country: "USA"
        }
    }
];

class PersonQuery implements ISearchable<IPerson> {
    search(query?: [keyof IPerson, unknown][], options?: {
        limit?: number;
        offset?: number;
    }): IPerson[] {
        return personList.filter(p => {
            return query?.every(q => {
                return p[q[0]] === q[1];
            });
        });
    }
}

describe('ISearchable', () => {

    describe('Creation', () => {
        it('should create', () => {
            const query = new PersonQuery();
            expect(query).toBeTruthy();
        })
    });

    describe('Search', () => {
        it('should search', () => {
            const query = new PersonQuery();
            const spy = jest.spyOn(query, 'search');
            const result = query.search([
                ['address', personList[0].address]
            ]);
            expect(spy).toHaveBeenCalled();
        });
        it('should not return items when no query is provided', () => {
            const query = new PersonQuery();
            const result = query.search();
            expect(result.length).toBe(0);
        });
        it('should return an array of Person', () => {
            const result = new PersonQuery().search([
                ['name', 'John']
            ]);
           expect(result).toBeInstanceOf(Array);
        });
        it('should return all people named John', () => {
            const result = new PersonQuery().search([
                ['name', 'John']
            ]);
            expect(result.length).toBe(1);
            expect(result[0].name).toBe('John');
        })
    });
})