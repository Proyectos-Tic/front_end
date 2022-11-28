import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Party } from '../../../models/party.model';
import { PartiesService } from '../../../services/parties.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  columnNames: string[] = ['Nombre', 'Lema', 'Opciones'];
  parties: Party[];

  constructor(private partiesService: PartiesService, private router: Router) { }

  ngOnInit(): void {
    this.list();
  }

  list(): void{
    let session = localStorage.getItem('session');
    this.partiesService.list().subscribe(
      data => { this.parties = data },
      error => { console.log(error) }
    )
  }

  create(): void{
    this.router.navigate(["pages/partidos/crear"]);
  }

  edit(id: string): void{
    this.router.navigate(["pages/partidos/actualizar/" + id]);
  }

  delete(id: string): void{
    Swal.fire({
      title: 'Eliminar partido',
      text: '¿Está seguro de que quiere eliminar este partido politico?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: "#D33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar",
      confirmButtonColor: "#3085D6",
    }).then((result) => {
      if (result.isConfirmed){
        this.partiesService.delete(id).subscribe(
          data => {
            Swal.fire(
              'Exito',
              'Partido eliminado satisfactoriamente.'
            ),
            this.ngOnInit();
          },
          error => {console.log(error)}
        )
      }
    })

  }
}
