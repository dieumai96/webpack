import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'app-root',
    moduleId: module.id.toString(),
    template: `<router-outlet></router-outlet>
    `,
})
export class AppComponent implements OnInit {
    name = 'Angular 7 & Webpack 4';
    a = 10;
    ngOnInit() {
        console.log(this.a);
    }
}