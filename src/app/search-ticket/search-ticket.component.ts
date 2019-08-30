import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FormControl } from '@angular/forms';
import { TicketService } from '../services/ticket.service';
import { debounceTime, distinctUntilChanged, startWith, switchMap, tap, map } from 'rxjs/operators';
@Component({
    selector: 'app-search-ticket',
    moduleId: module.id.toString(),
    styles: [require('./search-ticket.component.scss').toString()],
    template: require('./search-ticket.component.html'),
})
export class SearchTicketComponent implements OnInit {
    tickets$: Observable<any>;
    searchCriteria = new FormControl();

    constructor(private ticketService: TicketService) { }
    ngOnInit() {
        const searchBy$ = this.searchCriteria.valueChanges;
        debugger;
        this.tickets$ = searchBy$.pipe(
            debounceTime(350),
            distinctUntilChanged(),
            startWith(''),
            switchMap((criteria: string) => {
                const request$ = this.ticketService.searchTicket({
                    page: 1,
                    limit: 20,
                    title: criteria
                }).pipe(
                    map(res => {
                        if (res.status == 0) {
                            return res.data;
                        }
                    })
                )
                return !criteria.length ? of([]) : request$
            })
        );
    }
}