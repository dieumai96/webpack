import { Component } from '@angular/core';
@Component({
    selector: 'app-root',
    moduleId: module.id,
    styles: [require('./app.component.scss').toString()],    
    template: require('./app.component.html'),
})
export class AppComponent {
    name = 'Angular 7 & Webpack 4';
}