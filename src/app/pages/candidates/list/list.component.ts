import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Candidate } from '../../../models/candidate.model';
import { CandidatesService } from '../../../services/candidates.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  columnNames: string[] = ['CC', 'N° Resolución', 'Nombre', 'Partido', 'Opciones'];
  candidates: Candidate[];

  constructor(private candidatesService: CandidatesService, private router: Router) { }

  ngOnInit(): void {
    this.list();
  }

  list(): void{
    let session = localStorage.getItem('session');
    this.candidatesService.list().subscribe(
      data => { this.candidates = data },
      error => { console.log(error) }
    )
  }

  create(): void{
    this.router.navigate(["pages/candidatos/crear"]);
  }

  edit(id: string): void{
    this.router.navigate(["pages/candidatos/actualizar/" + id]);
  }

  delete(id: string): void{
    Swal.fire({
      title: 'Eliminar candidato',
      text: '¿Está seguro de que quiere eliminar este Candidato politico?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: "#D33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar",
      confirmButtonColor: "#3085D6",
    }).then((result) => {
      if (result.isConfirmed){
        this.candidatesService.delete(id).subscribe(
          data => {
            Swal.fire(
              'Exito',
              'Candidato eliminado satisfactoriamente.'
            ),
            this.ngOnInit();
          },
          error => {console.log(error)}
        )
      }
    })

  }

}
