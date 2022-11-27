import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'console';
import Swal from 'sweetalert2';
import { Candidate } from '../../../models/candidate.model';
import { CandidateService } from '../../../services/candidate.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  columnNames : string[] = ["Cédula", "Nombre", "Apellido", "Resolución", "Partido", "Opciones"]
  candidates : Candidate[];

  constructor(private router: Router,
              private candidateServices: CandidateService) { }

  ngOnInit(): void {
    this.list();
  }

  list(): void{
    this.candidateServices.list().subscribe(
      data => {
        console.log("Candidate list successfully");
        
        this.candidates = data;
      },
      error => {
        console.log("Cannot access to the list of candidates in ApiGateway.");
        console.log(error);       
      }
    )
  }

  create(): void{
    this.router.navigate(["pages/candidate/create"]);
  }

  update(id_ : string): void{
    this.router.navigate(["pages/candidate/update/"+id_])
  }

  delete(id_ : string): void{
    Swal.fire({
      title:"Eliminar candidato",
      text:"¿Esta seguro que desea eliminar al candidato?",
      icon:"warning",
      showCancelButton: true,
      cancelButtonColor: "#D33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, eliminar",
      confirmButtonColor: "#3085D6"
    }).then((result)=>{
      if(result.isConfirmed){
        this.candidateServices.delete(id_).subscribe(
          data => {
            Swal.fire(
              "Eliminado",
              "El estudiante ha sido eliminado correctamente.",
              "success"
            )
            this.ngOnInit();
          },
          error => {
            console.log(error);
            Swal.fire(
              "Error al eliminar",
              "No se ha podido eliminar el estudiante.",
              "error"
            )
            
          }
        )
      }
    })
  }
}
