import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../../../models/user.model';
import { SecurityService } from '../../../services/security.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string = "";
  password: string = "";

  constructor(private securityService: SecurityService, private router: Router) { }

  ngOnInit(): void {
  }

  login(): void{
    console.log(`Email: ${this.email} Password: ${this.password}`);
    let user: User = {
      email: this.email,
      password: this.password
    }
    this.securityService.validateLogin(user).subscribe(
      data => {
        this.securityService.saveSessionData(data);
        this.router.navigate(["pages/candidatos/listar"]);
      },
      error => {
        Swal.fire({
          title: "Error de acceso.",
          text: "Las credenciales de acceso no coinciden.",
          icon: "error",
          timer: 5000
        });

      }
    );
  }

}
