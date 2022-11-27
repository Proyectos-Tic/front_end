import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Table } from '../../../models/table.model';
import { TableService } from '../../../services/table.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  creationMode: boolean = true;
  tableId: string = "";
  mesa: Table = {
    numero:"",
    cc_inscritas:""
  }

  sendingAttempt: boolean = false;

  constructor(private tableService: TableService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params.tableId){
      // Update
      this.creationMode = false;
      this.tableId = this.activatedRoute.snapshot.params.tableId;
      this.getTable(this.tableId);
    }
    else // Create
      this.creationMode = true;
  }

  getTable(id:string): void{
    this.tableService.getOne(id).subscribe(
      data => {
        this.mesa = data;
      },
      error => {
        console.log(error);
        
      }
    );
  }

  validateMandatoryData(): boolean {
    this.sendingAttempt =  true;
    if(this.mesa.numero=="" || this.mesa.cc_inscritas==""){
          return false;
        }
    else
        return true;
  }

  create():void{
    if(this.validateMandatoryData()){
      this.tableService.create(this.mesa).subscribe(
        data => {
          Swal.fire(
            "Mesa creado",
            "La mesa ha sido creado correctamente.",
            "success"
          );
          this.router.navigate(["pages/table/list"]);
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

  update():void{
    if(this.validateMandatoryData()){
      let mesa_ : Table = {...this.mesa}
      delete mesa_._id
      this.tableService.update(mesa_, this.mesa._id).subscribe(
        data => {
          Swal.fire(
            "Actualizado",
            "El candidato ha sido actualizado correctamente",
            "success"
          );
          this.router.navigate(["pages/table/list"]);
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
