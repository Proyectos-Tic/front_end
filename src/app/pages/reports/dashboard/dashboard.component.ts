import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportsService } from '../../../services/reports.service';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  results: [];

  constructor(private reportsServices: ReportsService, private router: Router) { }

  ngOnInit(): void {
  }

  /* getGeneralReport(){
    this.reportsServices.general_reports().subscribe(
      data => { this.results = [...data] }
    )
  } */
}
