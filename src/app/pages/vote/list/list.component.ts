import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Vote } from '../../../models/vote.model';
import { VoteService } from '../../../services/vote.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  columnNames: string[] = ['Mesa de votación', 'Candidato politico', 'Partido politico', 'Opciones']
  votos: Vote[];

  constructor(private votoService: VoteService,
              private router: Router) { }

  ngOnInit(): void {
    this.list();
  }

  list(): void{
    this.votoService.list().subscribe(
      data => {
        console.log("List of votes received successfully.");
        this.votos = data;        
      },
      error => {
        console.log("Cannot access to the list of votes in ApiGateway.");        
        console.log(error);        
      }
    );
  }

  create(): void{
    this.router.navigate(["pages/vote/create"])
  }

  delete(id: string): void{
    Swal.fire({
      title:"Eliminar voto",
      text:"¿Esta seguro que desea eliminar el voto?",
      icon:"warning",
      showCancelButton: true,
      cancelButtonColor: "#D33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, eliminar",
      confirmButtonColor: "#3085D6"
    }).then(result => {
      if(result.isConfirmed){
        this.votoService.delete(id).subscribe(
          data => {
            Swal.fire(
              "Eliminado",
              "El voto ha sido eliminado correctamente.",
              "success"
            )
            this.ngOnInit();
          },
          error => {
            console.log(error);
            Swal.fire(
              "Error al eliminar",
              "No se ha podido eliminar el voto.",
              "error"
            )
            
          }
        )
      }
    })
  }

}
