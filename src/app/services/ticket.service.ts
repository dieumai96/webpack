import { Injectable } from '@angular/core';
import { CallApiService } from '../shared/calllApi.service';
import { Url } from './../config/Url';
import { Observable } from 'rxjs';
@Injectable()

export class TicketService {
    constructor(
        private callApiService: CallApiService
    ) { }
    searchTicket(body: any): Observable<any> {
        return this.callApiService.callApiPost(Url.GET_ALL_REFLECT, body, true);
    }
}