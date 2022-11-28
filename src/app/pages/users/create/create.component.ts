import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Rol } from '../../../models/rol.model';
import { User } from '../../../models/user.model';
import { RolesService } from '../../../services/roles.service';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  creationMode: boolean = true; //CREATE -> True - UPDATE -> False
  idUser: number = null;
  user: User = {
    nickname: "",
    email: "",
    password: "",
    rol:{
      idRol: null
    }
  };
  sendingAttempt: boolean = false;
  rols: Rol[];

  constructor(private rolesServices: RolesService, private router: Router,
    private activatedRoute: ActivatedRoute, private usersService: UsersService) { }

  ngOnInit(): void {
    this.getRoles();
    if (this.activatedRoute.snapshot.params.idUser){
      this.creationMode = false;
      this.idUser = this.activatedRoute.snapshot.params.idUser;
      this.getUser(this.idUser)
    }
    else {
      this.creationMode = true;
    }
  }

  getUser(id:number): void{
    this.usersService.getOne(id).subscribe(
      data => { this.user = data
        this.user.password = ""; },
      error => { console.log(error) }
    );
  }

  validateMandatoryData(): boolean {
    this.sendingAttempt = true;
    if (this.creationMode){
      if (this.user.nickname=="" || this.user.email=="" || this.user.password=="" || this.user.rol.idRol==null)
      return false;
      else
      return true;
    }
    else {
      if (this.user.nickname=="" || this.user.email=="" || this.user.rol.idRol==null)
      return false;
      else
      return true;
    }
  }

  create(): void {
    if(this.validateMandatoryData()){
      this.usersService.create(this.user).subscribe(
        data => {
          Swal.fire({
            title: "Exito",
            text: "Usuario creado satisfactoriamente.",
            icon: "success",
          });
          this.router.navigate(["pages/usuarios/listar"])
        },
        error => {
          console.log(error);
          Swal.fire({
            title: "Error en el proceso",
            text: "Estamos presentando inconvenientes. Por favor, intente mas tarde.",
            icon: "error",
            timer: 5000
          })
         }
      )
    }
    else {
      Swal.fire({
        title: "Campos obligatorios",
        text: "Porfavor diligencie todos los campos indicados.",
        icon: "warning",
        timer: 5000
      })
    }
  }

  edit(): void {
    if(this.validateMandatoryData()){
      let user_: User = {...this.user}
      delete user_.rol.permissions;
      delete user_.id;
      console.log(user_)
      this.usersService.edit(this.idUser, user_).subscribe(
        data => {
          Swal.fire({
            title: "Exito",
            text: "Información de usuario actualizada satisfactoriamente.",
            icon: "success",
          });
          console.log("DATA")
          console.log(data)
          this.router.navigate(["pages/usuarios/listar"])
        },
        error => {
          console.log(error)
          Swal.fire({
            title: "Error en el proceso",
            text: "Estamos presentando inconvenientes. Por favor, intente mas tarde.",
            icon: "error",
            timer: 5000
          })
        }
      )

    }
    else {
      Swal.fire({
        title: "Campos obligatorios",
        text: "Porfavor diligencie todos los campos indicados.",
        icon: "warning",
        timer: 5000
      })
    }
  }

  getRoles(): void{
    this.rolesServices.list().subscribe(
      data => { this.rols = data },
      error => { console.log(error) }
    )
  }

}
