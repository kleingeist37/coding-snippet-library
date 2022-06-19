import { NgModule } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';


@NgModule({
  declarations: [],
  exports: [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatToolbarModule
]
})
export class MaterialModule { }


//ng add @angular/material
