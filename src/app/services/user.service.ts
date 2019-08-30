import { Injectable } from '@angular/core';
import { CallApiService } from '../shared/calllApi.service';
import { Url } from './../config/Url';
import { Observable } from 'rxjs';
@Injectable()

export class UserService {
    constructor(
        private callApiService: CallApiService
    ) { }
    searchStatus(content: any, type?: string): Observable<any> {
        let body: any = {
            limit: 20,
            page: 1,
        }
        switch (type) {
            case 'status': {
                body.status = content;
                break;
            }
            case 'status': {
                body.title = content
                break;
            }
        }

        return this.callApiService.callApiPost(Url.GET_ALL_REFLECT, body, true);
    }
}