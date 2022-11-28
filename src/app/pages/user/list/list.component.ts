import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  columnNames : string[] = ['Rol', 'Pseudónimo', 'Email', 'Opciones']
  users : User[];

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.list();
  }

  list():void{
    this.userService.list().subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  create():void{
    this.router.navigate(["pages/user/create"])
  }

  update(id:number):void{    
    this.router.navigate([`pages/user/update/${id}`])
  }

  delete(id:number):void{
    Swal.fire({
      title:"Eliminar usuario",
      text:"¿Esta seguro que desea eliminar el usuario?",
      icon:"warning",
      showCancelButton: true,
      cancelButtonColor: "#D33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, eliminar",
      confirmButtonColor: "#3085D6"
    }).then(result => {
      if(result.isConfirmed){
        this.userService.delete(id).subscribe(
          data => {
            Swal.fire(
              "Eliminado",
              "El usuario ha sido eliminado correctamente.",
              "success"
            )
            this.ngOnInit();
          },
          error => {
            console.log(error);
            Swal.fire(
              "Error al eliminar",
              "No se ha podido eliminar el usuario.",
              "error"
            )
          }
        );
      }
    })
  }

}
