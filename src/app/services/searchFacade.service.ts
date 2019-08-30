import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class SearchFacade {
    ticket$: Observable<any>;
    searchCreterial$: Observable<string>;

    updateCretial(searchTerm: string) {

    }

    loadTicket(searchBy$: Observable<string>): Observable<any> {
        return of("a");
    }
}