# TS-Search

 ts-search is a list of helper functions that are commonly found when implementing 'search' functionality within an application. I've tried to make everything as generic as I could, but given that search functionality can be highly specific to the application you are currently developing, these functions/helpers will not be able to help everyone.


  - [Examples:](#examples)
    - [Creating a new IFilterable:](#creating-a-new-ifilterable)
  - [Sorting](#sorting)
  - [IQueryable](#iqueryable)
  - [ISearchable](#isearchable)


It feels like just about every application I've worked on in the past year or two has had some sort of search/sort/filter mechanism, in doing so, I've noticed a few patterns and/or pain points in the process that could be mitigated by just simply introducing a business-logic library that focuses on those aspects. While submitting the search is up to you, simple things like building the query/route params, and the URL from those.

Filtering always seems to take the longest, as they can be a bit tricky since you're dealing with different value types, N number of conditions, etc. I hope to mitigate this at least a little with the IFilterable types. 

Sorting is never much of a problem, really. Normally pretty quick and simple, but I do have some helper functions for those as well.


## Examples:

To create a set of filters, you must first define the model you'd like to filter with. This could be a model of your expected results, of possibly predefined filters handed to you by the business. The IFilterable shouldn't care.

### Creating a new IFilterable: 

```ts
//Define the model
export interface IPerson {
    name: string;
    age: number;
    address: IAddress;
    phone?: string;
    email?: string;
}
//Define the values from the model that will be filtered on.
values: FilterValuePair<IPerson>[] = [
    [
      "name", 
      [
        ['John',true], 
        ['Jane', true],
        ['Joe', true]
      ]
    ],
];

//Create a new filter item by using the FilterHandler singleton.
const personFilter = FilterHandler.newFilter<IPerson>();

//Create url query params from the filters
 const params = personFilter.toUrlParams(values);

// params: name=John&name=Jane&name=Joe
```


At first glance the FilterValuePair object can be a bit confusing, but it's actually rather simple. Let's break it down. The outer pair of square braces defines an array for filter params. Next step down is a tuple of type `string, [[key, boolean]]`, where the string is a key on the filterable object. In this case, we are saying "I want to filter on the 'name' property of IPerson." The next set of brackets is an array of tuples, in which each `key` is a type that matches the value type of `name`. In this instance, we want to filter for "John", "Jane", and "Joe". Last but not least, the boolean is simply a flag for whether this specific filter item is active or not. As you can imagine, if it is false, the value would not be included in the filter / url.

The tuple thing isn't my favorite either, but it does allow me to do some pretty neat tricks in order to satisfy type checking, etc. I plan on having the FilterHandler object will handle the IFilterValuePair object for you eventually, but today is not that day.


## Sorting

As of right now, only basic sort functionalty is in place via the rankedSort method. Just pass your type and the key you'd like to sort on and it'll return the results in descending order. As of this moment it doesn't achieve much more than TS's native Array.sort(). Future plans are to create a weighted sort, allowing for multiple values, and maybe a couple more if I can think of any.


## IQueryable
Both IQueryable and QueryItem are exported for you to use and extend as you please. IQueryable makes sure anything that implements it also includes a toUrl() function that returns a string, as in (you guessed it), a URL. The QueryItem class implements IQueryable and will 'wrap around' your type in order to create an immutablke set of query params out of its properties. the toUrl function will return a flat representation of your object (no nested object, because that just doesn't make much sense). The one problem is that if your object DOES include a nested object, it will not remove it for you. You can see the IQueryable.test.ts file for how I'm achieving this. Doing this natively IS on my to-do list, but for now we will suffer together.

## ISearchable
This one is pretty short and sweet. Essentially all it is, is a collection of helpful method signatures of what a 'search' should consume, and return. If your class implements it, then it must impelement a search() method that satisfies at least one of the signaturs on the interface. Not much more I can do here as the implementation of the search is up to the application, but nonetheless thought it might be helpful to include some method signatures.

If you find any bugs (impossible!!), please submit an issue and I'll get to it as soon as I can, or if you feel like squashing it yourself, that is always much appreciated. 

P.S. I'm never NOT okay with someone buying me a beer!