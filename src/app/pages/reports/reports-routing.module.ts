import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DepartmentsComponent } from './departments/departments.component';
import { StudentsComponent } from './students/students.component';

const routes: Routes = [
  {
    path: 'courses',
    component: CoursesComponent
  },
  {
    path: 'students',
    component: StudentsComponent
  },
  {
    path: 'departments',
    component: DepartmentsComponent
  },
  {
    path: 'general',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
