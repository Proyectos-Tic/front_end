import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Student } from '../../../models/student.model';
import { StudentsService } from '../../../services/students.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  columnNames: string[] = ['Cédula', 'Nombres', 'Apellidos', 'Opciones']
  students: Student[];

  constructor(private studentServices: StudentsService,
              private router: Router) { }

  ngOnInit(): void {
    //When page starts
    this.list();
  }

  list(): void{
    this.studentServices.list().subscribe({next: value => console.log(value)});
    
    this.studentServices.list().subscribe({
      next: data => {
        this.students = data;
      },
      error: error => {
        console.log(`Error en list:`);
        console.log(error);
        
      }
    })
  }

  create(): void{
    this.router.navigate(["pages/student/create"]);
  }

  update(id: string): void{
    this.router.navigate(["pages/student/update/"+id])
  }

  delete(id:string): void{
    Swal.fire({
        title:"Eliminar estudiante",
        text: "¿Esta seguro que desea eliminar al estudiante?",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: "#D33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Si, eliminar.",
        confirmButtonColor: "#3085D6"
      }).then((result)=>{
        if(result.isConfirmed){
          this.studentServices.delete(id).subscribe(
            data => {
              Swal.fire(
                "Eliminado",
                "El estudiante ha sido eliminado correctamente.",
                "success"
              ),
              this.ngOnInit();
            },
            error => {
              console.log(error);
              
            }
          )
        }
      })
  }

}
