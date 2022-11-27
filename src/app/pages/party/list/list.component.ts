import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Party } from '../../../models/party.model';
import { PartyService } from '../../../services/party.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  columnNames : string[] = ['Nombre','Lema','Opciones']
  partidos : Party[];

  constructor(private router:Router,
              private partyServices: PartyService) { }

  ngOnInit(): void {
    this.list();
  }

  list(): void{
    this.partyServices.list().subscribe(
      data =>{
        this.partidos = data;
      },
      error =>{
        console.log("Cannot access to the list of parties in ApiGateway");        
        console.log(error);
        
      }
    )
  }

  create(): void{
    this.router.navigate(["pages/party/create"]);
  }

  update(id:string): void{
    this.router.navigate(["pages/party/update/"+id])
  }

  delete(id:string): void{
    Swal.fire({
      title:"Eliminar partido",
      text:"¿Esta seguro que desea eliminar el partido politico?",
      icon:"warning",
      showCancelButton: true,
      cancelButtonColor: "#D33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, eliminar",
      confirmButtonColor: "#3085D6"
    }).then((x)=>{
      if(x.isConfirmed){
        this.partyServices.delete(id).subscribe(
          data => {
            Swal.fire(
              "Eliminado",
              "El partido politico ha sido eliminado correctamente.",
              "success"
            )
            this.ngOnInit();
          },
          error => {
            console.log(error);
            Swal.fire(
              "Error al eliminar",
              "No se ha podido eliminar el partido politico.",
              "error"
            )
            
          }
        )
      }
    })
  }

}
