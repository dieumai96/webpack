export interface SearchCriteria {
    ticket: string,
    status: number,
}

// export interface SearchResult {
//     id: string,
//     content: string,
//     date: number,
// }

export class SearchState {
    ticket: any[] = [];
    criteria: SearchCriteria = {
        ticket: '',
        status: 0,
    }
}

