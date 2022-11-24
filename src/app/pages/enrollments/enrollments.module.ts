import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnrollmentsRoutingModule } from './enrollments-routing.module';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';


@NgModule({
  declarations: [
    ListComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    EnrollmentsRoutingModule
  ]
})
export class EnrollmentsModule { }
