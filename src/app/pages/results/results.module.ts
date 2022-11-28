import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultsRoutingModule } from './results-routing.module';
import { CreateComponent } from './create/create.component';
import { NbCardModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [

    CreateComponent
  ],
  imports: [
    CommonModule,
    ResultsRoutingModule,
    NbCardModule,
    FormsModule
  ]
})
export class ResultsModule { }
