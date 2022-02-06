import { IPerson } from "../../models/person";
import { FilterHandler, FilterValuePair } from "./IFilterable";


describe("IFilterable", () => {

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

    let values: FilterValuePair<IPerson>[];

    beforeEach(() => {
        values = [
            [
                "name", 
                [
                    ['John',true], 
                    ['Jane', true],
                    ['Joe', true]
                ]
            ],
        ];
    })
 
    describe("Creation", () => {
        it("should create", () => {
            const personFilter = FilterHandler.newFilter<IPerson>();
            expect(personFilter).toBeTruthy();
        });
    });

    describe("Filter", () => {
        it("should filter", () => {
            const personFilter = FilterHandler.newFilter<IPerson>();
            const filtered = personFilter.filter(personList, values);
            expect(filtered.length).toBe(3);
        });

        it('should not filter on disabled values', () => {
            const personFilter = FilterHandler.newFilter<IPerson>();
            values[0][1][0][1] = false;
            const filtered = personFilter.filter(personList, values);
            expect(filtered.length).toBe(2);
        })
    });

    describe("toUrlParams", () => {
        it("should create url params", () => {
            const personFilter = FilterHandler.newFilter<IPerson>();
            const params = personFilter.toUrlParams(values);
            expect(params).toBe("name=John&name=Jane&name=Joe");
        });

        it("should create url params with disabled values", () => {
            const personFilter = FilterHandler.newFilter<IPerson>();
            values[0][1][0][1] = false;
            const params = personFilter.toUrlParams(values);
            expect(params).toBe("name=Jane&name=Joe");
        });
    });

    describe("FilterHandler", () => {
        it("should create", () => {
            expect( FilterHandler.instance).toBeTruthy();
        })

        it('should get the current filter', () => {
            const personFilter = FilterHandler.newFilter<IPerson>();
            expect(FilterHandler.instance.currentFilter).toStrictEqual(personFilter);
        })

        it('should return all filters with key of "name"', () => {
            const personFilter = FilterHandler.newFilter<IPerson>();
            const filters = personFilter.getFilterByKey("name", values);
            expect(filters[0]).toBe(values[0]);
        })

        it('should get filter value pair by key and value', () => {
            const personFilter = FilterHandler.newFilter<IPerson>();
            const filter = personFilter.getFilterByKeyAndValue("name", "Jane", values);
            expect(filter).toStrictEqual(values[0][1][1]); 
        })
    })
});
