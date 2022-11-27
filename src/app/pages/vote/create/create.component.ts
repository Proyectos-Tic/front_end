import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { log } from 'console';
import Swal from 'sweetalert2';
import { Candidate } from '../../../models/candidate.model';
import { Table } from '../../../models/table.model';
import { Vote } from '../../../models/vote.model';
import { CandidateService } from '../../../services/candidate.service';
import { TableService } from '../../../services/table.service';
import { VoteService } from '../../../services/vote.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  creationMode : boolean = true;
  voto : Vote = {
    candidato: {
      _id:"",
    },
    mesa: {
      _id:""
    }
  };
  candidatos : Candidate[];
  mesas : Table[];
  sendingAttempt: boolean = false;

  constructor(private votoService: VoteService,
              private candidateService: CandidateService,
              private tableService: TableService,
              private router: Router) { }

  ngOnInit(): void {
    this.getCandidates();
    this.getTables();
  }

  getTables(): void{
    this.tableService.list().subscribe(
      data => {
        this.mesas = data;
      },
      error => {

        console.log(error);
      }
    )
  }

  getCandidates(): void{
    this.candidateService.list().subscribe(
      data => {
        this.candidatos = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  getVote(id_ : string): void{
    this.votoService.getOne(id_).subscribe(
      data => {
        this.voto = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  validateMandatoryData(): boolean {
    this.sendingAttempt = true;
    console.log(this.voto.candidato._id);
    console.log(this.voto.mesa._id);    
    if(this.voto.candidato._id=="" || this.voto.mesa._id==""){
      return false
    }
    else
      return true
  }

  create():void{
    if(this.validateMandatoryData()){
      this.votoService.create(this.voto.mesa._id, this.voto.candidato._id).subscribe(
        data => {
          Swal.fire(
            "Voto creado",
            "El voto ha sido creado correctamente.",
            "success"
          );
          this.router.navigate(["pages/vote/list"]);
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
        text:"Por favor, seleccionar todos los campos obligatorios",
        icon: "warning",
        timer: 5000
      })
    }
  }

}
