import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Candidate } from '../../../models/candidate.model';
import { CandidateService } from '../../../services/candidate.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  creationMode: boolean = true;
  candidateId: string = "";
  candidate: Candidate = {
    id_personal: "",
    lastname: "",
    n_resolution: "",
    name: "",
    partido: JSON,
  }

  sendingAttempt: boolean = false;

  constructor(private candidateServices: CandidateService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params.candidateId){
      // Update
      this.creationMode = false;
      this.candidateId = this.activatedRoute.snapshot.params.candidateId;
      this.getCandidate(this.candidateId);
    }
    else // Create
      this.creationMode = true;
  }

  getCandidate(id:string): void{
    this.candidateServices.getOne(id).subscribe(
      data => {
        this.candidate = data;
      },
      error => {
        console.log(error);
        
      }
    );
  }

  validateMandatoryData(): boolean {
    this.sendingAttempt =  true;
    if(this.candidate.id_personal=="" || this.candidate.name=="" || this.candidate.lastname=="" ||
        this.candidate.n_resolution==""){
          return false;
        }
    else
        return true;
  }

  create():void{
    if(this.validateMandatoryData){
      this.candidateServices.create(this.candidate).subscribe(
        data => {
          Swal.fire(
            "Candidato creado",
            "El candidato ha sido creado correctamente.",
            "success"
          );
          this.router.navigate(["pages/candidate/list"]);
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
    if(this.validateMandatoryData){
      let candidate_ : Candidate = {...this.candidate}
      delete candidate_._id
      this.candidateServices.update(candidate_, this.candidate._id).subscribe(
        data => {
          Swal.fire(
            "Actualizado",
            "El candidato ha sido actualizado correctamente",
            "success"
          );
          this.router.navigate(["pages/candidate/list"]);
        },
        error => {
          console.log(error);
          Swal.fire({
            title:"Error en el proceso",
            text:"Por favor, diligenciar todos los campos obligatorios",
            icon: "warning",
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
