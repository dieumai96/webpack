import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',

  moduleId: module.id.toString(),
  styles: [require('./pages.component.scss').toString()],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;
}
