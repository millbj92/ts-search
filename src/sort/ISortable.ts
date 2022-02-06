export interface ISortable<T> {
    sort(items: T[], descending?: true): T[];
}

interface Rank<T> {
    item: T;
    rank: number;
}

function rankedSort<T>(
    items: T[], 
    rank: (v: T) => number): T[] {
    const ranks: Rank<T>[] = items.map((item) => ({
        item,
        rank: rank(item)
    }));
    ranks.sort((a, b) => b.rank - a.rank);
    console.log(ranks);
    return ranks.map((r) => r.item);
}


