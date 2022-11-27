import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Table } from '../../../models/table.model';
import { TableService } from '../../../services/table.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  columnNames :string[] = ['Numero de mesa', 'Cantidad de cedulas inscritas', 'Opciones']
  mesas: Table[];

  constructor(private router: Router,
              private tableService: TableService) { }

  ngOnInit(): void {
    this.list();
  }

  list(): void{
    this.tableService.list().subscribe(
      data => {
        console.log("Table list successfully");
        
        this.mesas = data;
      },
      error => {
        console.log("Cannot access to the list of tables in ApiGateway.");
        console.log(error);       
      }
    )
  }

  create(): void{
    this.router.navigate(["pages/table/create"]);
  }

  update(id_ : string): void{
    this.router.navigate(["pages/table/update/"+id_])
  }

  delete(id_ : string): void{
    Swal.fire({
      title:"Eliminar mesa",
      text:"¿Esta seguro que desea eliminar la mesa de votación?",
      icon:"warning",
      showCancelButton: true,
      cancelButtonColor: "#D33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, eliminar",
      confirmButtonColor: "#3085D6"
    }).then((result)=>{
      if(result.isConfirmed){
        this.tableService.delete(id_).subscribe(
          data => {
            Swal.fire(
              "Eliminado",
              "La mesa ha sido eliminado correctamente.",
              "success"
            )
            this.ngOnInit();
          },
          error => {
            console.log(error);
            Swal.fire(
              "Error al eliminar",
              "No se ha podido eliminar la mesa.",
              "error"
            )
            
          }
        )
      }
    })
  }

}
