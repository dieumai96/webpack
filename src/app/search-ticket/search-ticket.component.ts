import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketService } from '../services/ticket.service';
import { SearchFacade } from '../services/searchFacade.service';
import { take } from 'rxjs/operators';
@Component({
    selector: 'app-search-ticket',
    moduleId: module.id.toString(),
    styles: [require('./search-ticket.component.scss').toString()],
    template: require('./search-ticket.component.html'),
})
export class SearchTicketComponent implements OnInit {
    searchTerm: FormControl = new FormControl();
    formSearch: FormGroup;
    constructor(private ticketService: TicketService, private facade: SearchFacade, private formBuilder: FormBuilder) {
        this.formSearch = this.formBuilder.group({
            ticket: [''],
            status: ['',]
        })
    }
    ngOnInit() {
        this.formSearch.valueChanges.subscribe(data => {
            this.facade.searchTickets(of(data.ticket), of(data.status));
        })
        const initialTerm$ = this.facade.searchCreterial$.pipe(take(1));
        initialTerm$.subscribe(criterial => {
            console.log("in component", criterial);
            this.searchTerm.patchValue(criterial, { emitEvent: false })
        })

    }
}