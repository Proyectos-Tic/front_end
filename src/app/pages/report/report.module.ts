import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { TableComponent } from './table/table.component';
import { CandidateComponent } from './candidate/candidate.component';
import { PartyComponent } from './party/party.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    TableComponent,
    CandidateComponent,
    PartyComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule
  ]
})
export class ReportModule { }
