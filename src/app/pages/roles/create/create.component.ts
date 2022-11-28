import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Rol } from '../../../models/rol.model';
import { RolesService } from '../../../services/roles.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  creationMode: boolean = true; //CREATE -> True - UPDATE -> False
  rolId: number = null;
  rol: Rol = {
    name: "",
    description: "",
  };
  sendingAttempt: boolean = false;

  constructor(private rolesServices: RolesService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params.rolId){
      this.creationMode = false;
      this.rolId = this.activatedRoute.snapshot.params.rolId;
      this.getRol(this.rolId)
    }
    else {
      this.creationMode = true;
    }
  }

  getRol(id:number): void{
    this.rolesServices.getOne(id).subscribe(
      data => { this.rol = data },
      error => { console.log(error) }
    );
  }

  validateMandatoryData(): boolean {
    this.sendingAttempt = true;
    if (this.rol.name=="" || this.rol.description=="")
      return false;
    else
      return true;
  }

  create(): void {
    if(this.validateMandatoryData()){
      this.rolesServices.create(this.rol).subscribe(
        data => {
          Swal.fire({
            title: "Exito",
            text: "Partido politico creado satisfactoriamente.",
            icon: "success",
          });
          this.router.navigate(["pages/roles/listar"])
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
      let rol_: Rol = {...this.rol}
      delete rol_.idRol;
      this.rolesServices.edit(this.rolId, rol_).subscribe(
        data => {
          Swal.fire({
            title: "Exito",
            text: "Partido politico actualizado satisfactoriamente.",
            icon: "success",
          });
          this.router.navigate(["pages/roles/listar"])
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

}
