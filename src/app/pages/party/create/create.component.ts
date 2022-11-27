import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Party } from '../../../models/party.model';
import { PartyService } from '../../../services/party.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  creationMode: boolean = true;
  partyId: string = "";
  partido: Party = {
    nombre:"",
    lema:""
  }

  sendingAttempt: boolean = false;

  constructor(private partyService: PartyService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params.partyId){
      // Update
      this.creationMode = false;
      this.partyId = this.activatedRoute.snapshot.params.partyId;
      this.getParty(this.partyId);
    }
    else // Create
      this.creationMode = true;
  }

  getParty(id:string):void{
    this.partyService.getOne(id).subscribe(
      data => {
        this.partido = data;
      },
      error => {
        console.log(error);
        
      }
    );
  }

  validateMandatoryData():boolean{
    this.sendingAttempt = true;
    console.log('Lema'+this.partido.lema);
    console.log('Nombre'+this.partido.nombre);     
    if(this.partido.lema=="" || this.partido.nombre==""){
      return false;
    }
    else
      return true;
  }

  create():void{
    if(this.validateMandatoryData()){
      this.partyService.create(this.partido).subscribe(
        data => {
          Swal.fire(
            "Partido creado",
            "El partido ha sido creado correctamente.",
            "success"
          );
          this.router.navigate(["pages/party/list"]);
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
      )
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
    if(this.validateMandatoryData()){
      let partido_ : Party = {...this.partido}
      delete partido_._id
      this.partyService.update(partido_, this.partido._id).subscribe(
        data => {
          Swal.fire(
            "Actualizado",
            "El partido ha sido actualizado correctamente",
            "success"
          );
          this.router.navigate(["pages/party/list"]);
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

}
