import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material'
let materialList = [MatButtonModule];
@NgModule({
    declarations: [

    ],
    imports: [
        ...materialList
    ],
})
export class MaterialModule { }