import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { CallApiService } from './shared/calllApi.service';
import { SearchTicketComponent } from './search-ticket/search-ticket.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { TicketService } from './services/ticket.service';
import {MatInputModule} from '@angular/material';

@NgModule({
    declarations: [
        AppComponent,
        SearchTicketComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatInputModule,
        MatFormFieldModule,
        MatToolbarModule
    ],
    providers: [CallApiService, TicketService],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }