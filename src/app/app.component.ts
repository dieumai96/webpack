import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'app-root',
    moduleId: module.id.toString(),
    styles: [require('./app.component.scss').toString()],
    template: require('./app.component.html'),
})
export class AppComponent implements OnInit{
    name = 'Angular 7 & Webpack 4';
    ngOnInit(){
    }
}