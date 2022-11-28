import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Table } from '../../../models/table.model';
import { TablesService } from '../../../services/tables.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  columnNames: string[] = ['Numero', 'N° de Cedulas Registradas'];
  tables: Table[];

  constructor(private tablesService: TablesService, private router: Router) { }

  ngOnInit(): void {
    this.list();
  }

  list(): void{
    let session = localStorage.getItem('session');
    this.tablesService.list().subscribe(
      data => { this.tables = data },
      error => { console.log(error) }
    )
  }

  create(): void{
    this.router.navigate(["pages/mesas/crear"]);
  }

  edit(id: string): void{
    this.router.navigate(["pages/mesas/actualizar/" + id]);
  }

  delete(id: string): void{
    Swal.fire({
      title: 'Eliminar mesa',
      text: '¿Está seguro de que quiere eliminar esta mesa de votación?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: "#D33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar",
      confirmButtonColor: "#3085D6",
    }).then((result) => {
      if (result.isConfirmed){
        this.tablesService.delete(id).subscribe(
          data => {
            Swal.fire(
              'Exito',
              'Mesa de votación eliminada satisfactoriamente.'
            ),
            this.ngOnInit();
          },
          error => {console.log(error)}
        )
      }
    })

  }

}
