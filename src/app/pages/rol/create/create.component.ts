import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Rol } from '../../../models/rol.model';
import { RolService } from '../../../services/rol.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  creationMode : boolean = true;
  sendingAttempt: boolean = false;
  rolId: number = null;
  rol: Rol = {
    name:"",
    description:""
  }

  constructor(private rolService: RolService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params.rolId){
      // Update
      this.creationMode = false;
      this.rolId = this.activatedRoute.snapshot.params.rolId;
      this.getRol(this.rolId);
      console.log(this.rol);
      
    }
    else // Create
      this.creationMode = true;
  }

  validateMandatoryData(): boolean{
    this.sendingAttempt = true;
    if(this.rol.name=="" || this.rol.description==""){
      return false;
    }
    else
      return true;
  }

  getRol(id: number): void{
    this.rolService.getOne(id).subscribe(
      data => {
        this.rol = data;
      },
      error => {
        console.log(error);
        
      }
    )
  }

  create():void{
    if(this.validateMandatoryData()){
      this.rolService.create(this.rol).subscribe(
        data => {
          Swal.fire(
            "Rol creado",
            "El rol ha sido creado correctamente.",
            "success"
          );
          this.router.navigate(["pages/rol/list"]);
        },
        error =>{
          console.log(error);
          Swal.fire({
            title:"Error en el proceso",
            text:"Estamos presentando inconvenientes. Por favor, intente mas tarde",
            icon: "error",
            timer: 5000
          })
        }
      );
    }
    else{
      Swal.fire({
        title:"Campos obligatorios",
        text:"Por favor, seleccionar todos los campos obligatorios",
        icon: "warning",
        timer: 5000
      })
    }
  }

  update():void{
    if(this.validateMandatoryData()){
      let rol_ : Rol = {...this.rol}
      delete rol_.idRol
      this.rolService.update(this.rol.idRol, rol_).subscribe(
        data => {
          Swal.fire(
            "Actualizado",
            "El rol ha sido actualizado correctamente",
            "success"
          );
          this.router.navigate(["pages/rol/list"]);
        },
        error => {
          console.log(error);
          Swal.fire({
            title:"Error en el proceso",
            text:"Estamos presentando inconvenientes. Por favor, intente mas tarde",
            icon: "error",
            timer: 5000
          })          
        }
      );
    }
    else{
      Swal.fire({
        title:"Campos obligatorios",
        text:"Por favor, diligenciar todos los campos obligatorios",
        icon: "warning",
        timer: 5000
      })
    }
  }

}
