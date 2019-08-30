import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, combineLatest } from 'rxjs';
import { SearchState, SearchCriteria } from '../model/ticketFacade';
import { map, startWith, debounceTime, distinctUntilChanged, switchMap, filter } from 'rxjs/operators';
import { UserService } from './user.service';
import { TicketService } from './ticket.service';

@Injectable()
export class SearchFacade {
    constructor(
        private userService: UserService,
        private ticketService: TicketService
    ) { }
    ticket$: Observable<any>;


    private state = new SearchState();
    private dispatch = new BehaviorSubject<SearchState>(this.state);

    searchResult$: Observable<any[]> = this.dispatch.asObservable().pipe(
        map(state => state.ticket), startWith([] as any[]),
    )

    searchCreterial$: Observable<SearchCriteria> = this.dispatch.asObservable().pipe(
        map(state => state.criteria),
    )

    updateCriterial(ticket?: string, status?: number) {
        const criteria = { ...this.state.criteria, status, ticket };
        this.dispatch.next(
            (this.state = {
                ...this.state,
                criteria,
            })
        )
    }

    searchStatus(source$: Observable<number>, deboundTime?: 400): Observable<any> {
        return source$.pipe(
            debounceTime(deboundTime),
            distinctUntilChanged(),
            switchMap((status: number) => {
                return !status ? of([]) : this.userService.searchStatus(status, 'status');
            })
        )
    }

    searchBytitle(title$: Observable<string>, deboundTime?: 400): Observable<any> {
        return title$.pipe(
            debounceTime(deboundTime),
            distinctUntilChanged(),
            switchMap((title: string) => {
                return !title ? of([]) : this.userService.searchStatus(title, 'title');
            })
        )
    }

    searchTickets(
        searchBy$: Observable<string>,
        status$: Observable<number>,
        debounceT?: 400,
    ) {
        const criteria = this.state.criteria;
        searchBy$ = searchBy$.pipe(debounceTime(debounceT), distinctUntilChanged(), startWith(criteria.ticket),
            filter(x => x.length > 0)
        )
        status$ = status$.pipe(debounceTime(debounceT), distinctUntilChanged(), startWith(criteria.status),
            filter(x => typeof x == 'number')
        )
        combineLatest(searchBy$, status$).pipe(
            switchMap(([ticket, status]) => {
                console.log(ticket, status);
                // update state with new ticket and status;
                // status and ticket is not required 
                this.updateCriterial(ticket, status);
                const haveCriteria = ticket.length || status;
                return !haveCriteria ? of([]) : this.ticketService.searchTicket(ticket, status)
            })
        ).subscribe(this.updateTickets.bind(this));
    }

    updateTickets(ticket: any[]) {
        this.dispatch.next(
            (this.state = {
                ...this.state,
                ticket,
            })
        )
    }
}