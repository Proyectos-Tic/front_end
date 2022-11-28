import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Candidate } from '../../../models/candidate.model';
import { Result } from '../../../models/result.model';
import { Table } from '../../../models/table.model';
import { CandidatesService } from '../../../services/candidates.service';
import { ResultsService } from '../../../services/results.service';
import { TablesService } from '../../../services/tables.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  creationMode: boolean = true; //CREATE -> True - UPDATE -> False
  candidateId: string = "";
  result: Result = {
    candidate: {
      _id: ""
    },
    table: {
      _id:""
    },
    party: {
      _id: "",
    },
  };
  sendingAttempt: boolean = false;
  candidates: Candidate[];
  tables: Table[];

  constructor(private candidatesService: CandidatesService, private router: Router,
    private activatedRoute: ActivatedRoute, private tablesServices: TablesService, private resultsServices: ResultsService) { }

  ngOnInit(): void {
    this.getCandidates();
    this.getTables();
  }

  validateMandatoryData(): boolean {
    this.sendingAttempt = true;
    if (this.result.candidate._id=="" || this.result.table._id=="")
      return false;
    else
      return true;
  }

  create(): void {
    if(this.validateMandatoryData()){
      this.resultsServices.create(this.result).subscribe(
        data => {
          Swal.fire({
            title: "Exito",
            text: "Voto registrado satisfactoriamente.",
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

  getCandidates(): void{
    this.candidatesService.list().subscribe(
      data => { this.candidates = data; },
      error => { console.log(error) }
    )
  }

  getTables(): void{
    this.tablesServices.list().subscribe(
      data => { this.tables = data; },
      error => { console.log(error) }
    )
  }
}
