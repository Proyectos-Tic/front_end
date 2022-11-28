import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Rol } from '../../../models/rol.model';
import { RolesService } from '../../../services/roles.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  columnNames: string[] = ['Nombre', 'Descripcion'];
  roles: Rol[];

  constructor(private rolesService: RolesService, private router: Router) { }

  ngOnInit(): void {
    this.list();
  }

  list(): void{
    let session = localStorage.getItem('session');
    this.rolesService.list().subscribe(
      data => { this.roles = data },
      error => { console.log(error) }
    )
  }

  create(): void{
    this.router.navigate(["pages/roles/crear"]);
  }

  edit(id: number): void{
    this.router.navigate(["pages/roles/actualizar/" + id]);
  }

  delete(id: number): void{
    console.log(id)
    Swal.fire({
      title: 'Eliminar rol',
      text: '¿Está seguro de que quiere eliminar este rol?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: "#D33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar",
      confirmButtonColor: "#3085D6",
    }).then((result) => {
      if (result.isConfirmed){
        this.rolesService.delete(id).subscribe(
          data => {
            Swal.fire(
              'Exito',
              'Rol eliminado satisfactoriamente.'
            ),
            this.ngOnInit();
          },
          error => {console.log(error)}
        )
      }
    })

  }

}
