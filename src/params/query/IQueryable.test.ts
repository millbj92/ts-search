import { IPerson } from "../../../models/person";
import { QueryItem } from "./IQueryable";


type QueryablePerson =  Omit<IPerson, 'address'>;


describe('Creation', () => {
    const people: IPerson[] = [
        {
            name: "John Doe",
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
            name: "Jane Doe",
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
            name: "Joe Doe",
            age: 20,
            address: {
                street: "789 Main St",
                city: "Anytown",
                state: "CA",
                postal: "12345",
                country: "USA"
            }
        }
    
    ]
    let person: QueryablePerson;

    beforeEach(() => {
        person  = {
            name: people[0].name,
            age: people[0].age,
        };
    })
    it('should create', () => {
        const query = new QueryItem<QueryablePerson>(people[0]);
        expect(query).toBeTruthy();
    })

    it('should return the same person', () => {
        const query = new QueryItem<QueryablePerson>(people[0]);
        expect(query.getAll()).toEqual(people[0]);
    })

    it('should get the name of the person', () => {
        const query = new QueryItem<QueryablePerson>(people[0]);
        expect(query.get('name')).toEqual(people[0].name);
    });

    it('should set the name of the person', () => {
        const query = new QueryItem<QueryablePerson>(people[0]);
        query.set('name', 'Jane Doe');
        expect(query.get('name')).toEqual('Jane Doe');
    });

    it('should return the url', () => {
        const newPerson: QueryablePerson = {
            name: people[0].name,
            age: people[0].age
        }
        const query = new QueryItem<QueryablePerson>(newPerson);
        expect(query.toUrl()).toEqual('name=John+Doe&age=30')
    });
});