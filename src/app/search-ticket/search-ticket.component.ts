import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketService } from '../services/ticket.service';
import { debounceTime, distinctUntilChanged, startWith, switchMap, tap, map, take } from 'rxjs/operators';
import { SearchFacade } from '../services/searchFacade.service';
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
            if (this.formSearch.controls.ticket.value != "" && this.formSearch.controls.status.value != "") {
                this.facade.searchTickets(of(this.formSearch.controls.ticket.value), of(this.formSearch.controls.status.value));
            }
            if (this.formSearch.controls.ticket.value == "" && this.formSearch.controls.status.value != "") {
                this.facade.searchStatus(of(this.formSearch.controls.status.value));
            }
            if (this.formSearch.controls.ticket.value != "" && this.formSearch.controls.status.value == "") {
                this.facade.searchBytitle(of(this.formSearch.controls.title.value));
            }
        })
        const initialTerm$ = this.facade.searchCreterial$.pipe(take(1));
        initialTerm$.subscribe(criterial => {
            this.searchTerm.patchValue(criterial, { emitEvent: false })
        })

    }
}