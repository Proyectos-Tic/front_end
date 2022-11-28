import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Party } from '../../../models/party.model';
import { PartiesService } from '../../../services/parties.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  creationMode: boolean = true; //CREATE -> True - UPDATE -> False
  partyId: string = "";
  party: Party = {
    name: "",
    motto: "",
  };
  sendingAttempt: boolean = false;

  constructor(private partiesServices: PartiesService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params.partyId){
      this.creationMode = false;
      this.partyId = this.activatedRoute.snapshot.params.partyId;
      this.getParty(this.partyId)
    }
    else {
      this.creationMode = true;
    }
  }

  getParty(id:string): void{
    this.partiesServices.getOne(id).subscribe(
      data => { this.party = data },
      error => { console.log(error) }
    );
  }

  validateMandatoryData(): boolean {
    this.sendingAttempt = true;
    if (this.party.name=="" || this.party.motto=="")
      return false;
    else
      return true;
  }

  create(): void {
    if(this.validateMandatoryData()){
      this.partiesServices.create(this.party).subscribe(
        data => {
          Swal.fire({
            title: "Exito",
            text: "Partido politico creado satisfactoriamente.",
            icon: "success",
          });
          this.router.navigate(["pages/partidos/listar"])
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
      let party_: Party = {...this.party}
      delete party_._id;
      this.partiesServices.edit(this.party._id, party_).subscribe(
        data => {
          Swal.fire({
            title: "Exito",
            text: "Partido politico actualizado satisfactoriamente.",
            icon: "success",
          });
          this.router.navigate(["pages/partidos/listar"])
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
}
