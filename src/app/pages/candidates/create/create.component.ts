import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Candidate } from '../../../models/candidate.model';
import { Party } from '../../../models/party.model';
import { CandidatesService } from '../../../services/candidates.service';
import { PartiesService } from '../../../services/parties.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  creationMode: boolean = true; //CREATE -> True - UPDATE -> False
  candidateId: string = "";
  candidate: Candidate = {
    name: "",
    lastname: "",
    cc: null,
    resolution: null,
    party: {
      _id: null,
    },
  };
  sendingAttempt: boolean = false;
  parties: Party[];

  constructor(private candidatesServices: CandidatesService, private router: Router,
    private activatedRoute: ActivatedRoute, private partiesServices: PartiesService) { }

  ngOnInit(): void {
    this.getParties();
    if (this.activatedRoute.snapshot.params.candidateId){
      this.creationMode = false;
      this.candidateId = this.activatedRoute.snapshot.params.candidateId;
      this.getcandidate(this.candidateId)
    }
    else {
      this.creationMode = true;
    }
  }

  getcandidate(id:string): void{
    this.candidatesServices.getOne(id).subscribe(
      data => { this.candidate = data },
      error => { console.log(error) }
    );
  }

  validateMandatoryData(): boolean {
    this.sendingAttempt = true;
    if (this.candidate.name=="" || this.candidate.lastname=="" || this.candidate.cc==null
    || this.candidate.resolution==null || this.candidate.party==null)
      return false;
    else
      return true;
  }

  create(): void {
    if(this.validateMandatoryData()){
      this.candidatesServices.create(this.candidate).subscribe(
        data => {
          Swal.fire({
            title: "Exito",
            text: "Candidato politico creado satisfactoriamente.",
            icon: "success",
          });
          this.router.navigate(["pages/candidatos/listar"])
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
      let candidate_: Candidate = {...this.candidate}
      delete candidate_._id;
      this.candidatesServices.edit(this.candidate._id, candidate_).subscribe(
        data => {
          Swal.fire({
            title: "Exito",
            text: "Candidato politico actualizado satisfactoriamente.",
            icon: "success",
          });
          this.router.navigate(["pages/candidatos/listar"])
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

  getParties(): void{
    this.partiesServices.list().subscribe(
      data => { this.parties = data; },
      error => { console.log(error) }
    )
  }
}
