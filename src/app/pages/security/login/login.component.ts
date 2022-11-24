import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from '../../../services/security.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string = "";
  password: string = "";

  constructor(private securityService: SecurityService,
              private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    console.log(`Email: ${this.email} - Password ${this.password}`);
  }
}
