import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Table } from '../../../models/table.model';
import { TablesService } from '../../../services/tables.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  creationMode: boolean = true; //CREATE -> True - UPDATE -> False
  tableId: string = "";
  table: Table = {
    number: null,
    registered_ccs: []
  };
  newCC: number = null;
  sendingAttempt: boolean = false;

  constructor(private tablesServices: TablesService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params.tableId){
      this.creationMode = false;
      this.tableId = this.activatedRoute.snapshot.params.tableId;
      this.gettable(this.tableId)
    }
    else {
      this.creationMode = true;
    }
  }

  gettable(id:string): void{
    this.tablesServices.getOne(id).subscribe(
      data => { this.table = data },
      error => { console.log(error) }
    );
  }

  validateMandatoryData(): boolean {
    this.sendingAttempt = true;
    if (this.table.number==null)
      return false;
    else
      return true;
  }

  create(): void {
    if(this.validateMandatoryData()){
      this.table.registered_ccs.push(this.newCC);
      this.tablesServices.create(this.table).subscribe(
        data => {
          Swal.fire({
            title: "Exito",
            text: "Partido politico creado satisfactoriamente.",
            icon: "success",
          });
          this.router.navigate(["pages/mesas/listar"])
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
      let table_: Table = {...this.table}
      table_.registered_ccs.push(this.newCC)
      delete table_._id;
      this.tablesServices.edit(this.table._id, table_).subscribe(
        data => {
          Swal.fire({
            title: "Exito",
            text: "Partido politico actualizado satisfactoriamente.",
            icon: "success",
          });
          this.router.navigate(["pages/mesas/listar"])
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
