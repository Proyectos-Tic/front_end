import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Rol } from '../../../models/rol.model';
import { User } from '../../../models/user.model';
import { RolService } from '../../../services/rol.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  creationMode : boolean = true;
  sendingAttempt: boolean = false;
  userId: number = null;
  user : User = {
    nickname:"",
    email:"",
    password:"",
    rol:{
      idRol:null
    }
  }
  
  roles : Rol[];

  constructor(private rolService: RolService,
              private userService: UserService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getRoles();
    if(this.activatedRoute.snapshot.params.userId){
      // Update
      this.creationMode = false;
      this.userId = this.activatedRoute.snapshot.params.userId;
      this.getUser(this.userId);     
      
    }
    else // Create
      this.creationMode = true;
  }

  getRoles():void{
    this.rolService.list().subscribe(
      data => {
        this.roles = data;
      },
      error =>{
        console.log(error);
      }
    )
  }

  getUser(id:number):void{
    this.userService.getOne(id).subscribe(
      data =>{
        this.user = data;
        this.user.password = '';     
        console.log(this.user);
      },
      error => {
        console.log(error);        
      }
    )
  }

  validateMandatoryData(): boolean{
    this.sendingAttempt = true;
    if(this.user.email=="" || this.user.nickname=="" || this.user.password== "" ||
      this.user.rol==""){
      return false;
    }
    else
      return true;
  }

  create():void{
    if(this.validateMandatoryData()){
      this.userService.create(this.user).subscribe(
        data => {
          Swal.fire(
            "Usuario creado",
            "El usuario ha sido creado correctamente.",
            "success"
          );
          this.router.navigate(["pages/user/list"]);
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
      let user_ : User = {...this.user}
      delete user_.idUser;
      delete user_.rol;
      delete user_.email;
      this.userService.update(this.user.idUser, user_).subscribe(
        data => {
          console.log(user_);                    
          Swal.fire(
            "Actualizado",
            "El rol ha sido actualizado correctamente",
            "success"
          );
          this.router.navigate(["pages/user/list"]);
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
