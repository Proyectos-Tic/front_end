import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Rol } from '../../../models/rol.model';
import { RolService } from '../../../services/rol.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  columnNames : string[] = ['Nombre', 'Descripción', 'Opciones'];
  roles: Rol[];

  constructor(private rolService: RolService,
              private router: Router) { }

  ngOnInit(): void {
    this.list();
  }

  list():void{
    this.rolService.list().subscribe(
      data => {
        this.roles =  data;
      },
      error => {
        console.log(error);
      }
    );
  }

  create():void{
    this.router.navigate(["pages/rol/create"])
  }

  update(id:number):void{
    this.router.navigate([`pages/rol/update/${id}`])
  }

  delete(id: number):void{
    Swal.fire({
      title:"Eliminar voto",
      text:"¿Esta seguro que desea eliminar el voto?",
      icon:"warning",
      showCancelButton: true,
      cancelButtonColor: "#D33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, eliminar",
      confirmButtonColor: "#3085D6"
    }).then(result =>{
      if(result.isConfirmed){
        this.rolService.delete(id).subscribe(
          data => {
            Swal.fire(
              "Eliminado",
              "El rol ha sido eliminado correctamente.",
              "success"
            )
            this.ngOnInit();
          },
          error => {
            console.log(error);
            Swal.fire(
              "Error al eliminar",
              "No se ha podido eliminar el rol.",
              "error"
            )
          }
        );
      }
    });
  }

}
