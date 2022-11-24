import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Student } from '../../../models/student.model';
import { StudentsService } from '../../../services/students.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  creationMode: boolean = true; // true=create false=update
  studentId: string = "";
  student: Student = {
    personal_id: "",
    name:"",
    lastname:"",
  }
  sendingAttempt: boolean = false;

  constructor(private studentsServices: StudentsService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params.studentId){
      // Update
      this.creationMode = false;
      this.studentId = this.activatedRoute.snapshot.params.studentId;
      this.getStudent(this.studentId);
    }
    else //Create
      this.creationMode = true;
  }

  getStudent(id: string): void{
    this.studentsServices.getOne(id).subscribe(
      data => {
        this.student = data;
      },
      error => {
        console.log(error);
        
      }
    );
  }

  validateMandatoryData(): boolean{
    this.sendingAttempt = true;
    if(this.student.personal_id=="" || this.student.name=="" || this.student.lastname==""){
      return false;
    }
    else
      return true;
  }

  create():void{
    if(this.validateMandatoryData){
      this.studentsServices.create(this.student).subscribe(
        data => {
          Swal.fire({
            title:"Creado",
            text:"El estudiando ha sido creado correctamente.",
            icon:"success"
          });
          this.router.navigate(["pages/student/list"]);
        },
        error => {
          console.log(error);          
          Swal.fire({
            title:"Error en el proceso",
            text:"Estamos presentando inconvenientes. Por favor, intente mas tarde",
            icon:"error",
            timer: 5000
          })
        }
      )
    }else{
      Swal.fire({
        title:"Campos obligatorios",
        text:"Por favor, diligencias todos los campos obligatorios",
        icon:"warning",
        timer:5000
      })
    }
  }

  edit():void{
    if(this.validateMandatoryData){
      let student_: Student = {...this.student}
      delete student_._id
      this.studentsServices.update(student_, this.student._id).subscribe(
        data => {
          Swal.fire({
            title:"Actualizado",
            text:"El estudiando ha sido actualizado correctamente.",
            icon:"success"
          });
          this.router.navigate(["pages/student/list"]);
        },
        error => {
          console.log(error);          
          Swal.fire({
            title:"Error en el proceso",
            text:"Estamos presentando inconvenientes. Por favor, intente mas tarde",
            icon:"error",
            timer: 5000
          })
        }
      )
    }else{
      Swal.fire({
        title:"Campos obligatorios",
        text:"Por favor, diligencias todos los campos obligatorios",
        icon:"warning",
        timer:5000
      })
    }
  }

}
