import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { StudentsComponent } from './students/students.component';
import { CoursesComponent } from './courses/courses.component';
import { DepartmentsComponent } from './departments/departments.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    StudentsComponent,
    CoursesComponent,
    DepartmentsComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule
  ]
})
export class ReportsModule { }
