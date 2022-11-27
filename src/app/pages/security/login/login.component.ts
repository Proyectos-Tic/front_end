import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../../../models/user.model';
import { SecurityService } from '../../../services/security.service';
import { UserService } from '../../../services/user.service';
import { ShowcaseDialogComponent } from '../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string = "";
  password: string = "";

  constructor(private securityService: SecurityService,
              private router: Router,
              private userService: UserService) { }

  ngOnInit(): void {
  }

  login(): void {
    console.log(`Email:${this.email} - Password:${this.password}`);
    let user: User = {
      email: this.email,
      password: this.password
    }
    this.securityService.validateLogin(user).subscribe(
      data => {
        this.securityService.saveSessionData(data);
        Swal.fire({
            title:'Redirigiendo',
            text:`Bienvenido nuevamente ${data.rol.name}`,
            showConfirmButton: false,
            timer: 3500
          })
          if(data.rol.name=='Administrador'){
            this.router.navigate(["pages/user/list"]);
          }
          else if (data.rol.name=='Jurado'){
            this.router.navigate(["pages/vote/list"]);
          }
          else
            this.router.navigate(["pages/report/candidate"]);        
      },
      error => {
        console.log(error);
        Swal.fire({
          title:"Error de acceso",
          text:"Error en las credenciales de acceso. Verifique que sean correctas",
          icon:"error",
          timer: 5000
        })
        
      }
    )
  }

}
