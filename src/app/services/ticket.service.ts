import { Injectable } from '@angular/core';
import { CallApiService } from '../shared/calllApi.service';
import { Url } from './../config/Url';
@Injectable()

export class TicketService {
    constructor(
        private callApiService: CallApiService
    ) { }
    searchTicket(ticket: string, status: number) {
        let body = {
            limit: 20,
            page: 1,
            title: ticket,
            status
        }
        return this.callApiService.callApiPost(Url.GET_ALL_REFLECT, body, true);
    }
}