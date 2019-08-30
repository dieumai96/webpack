import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServerConfig } from './../config/serverConfig';
import { shareReplay, retryWhen, delayWhen, tap, map } from 'rxjs/operators';
import { timer } from 'rxjs';
@Injectable()

export class CallApiService {
    constructor(
        private http: HttpClient
    ) { }
    callApiPost(url: string, body?: any, token?: boolean) {
        if (token) {
            return this.http.post(`${ServerConfig.API_ENDPOINT}/${url}`, body, {
                headers: new HttpHeaders().set('Authorization', localStorage.getItem('token'))
            }).pipe(
                map(res => res),
                shareReplay(),
                // retryWhen(errors => {
                //     return errors
                //         .pipe(
                //             delayWhen(() => timer(2000)),
                //             tap(() => console.log('retrying...'))
                //         );
                // })
            )
        } else {
            return this.http.post(url, body).pipe(
                map(res => res),
                shareReplay(),
                retryWhen(errors => {
                    return errors
                        .pipe(
                            delayWhen(() => timer(2000)),
                            tap(() => console.log('retrying...'))
                        );
                })
            )
        }
    }

}