import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FieldModel } from 'src/app/models/parameters/Field.model';
import { SportTypeModel } from 'src/app/models/parameters/SportType.model';
import { FieldService } from 'src/app/services/parameters/field.service';
import { SportTypeService } from 'src/app/services/parameters/sport-type.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sport-type',
  templateUrl: './sport-type.component.html',
  styles: [
  ]
})
export class SportTypeComponent {

  public sportTypeList : SportTypeModel[] = []
  public fieldList : FieldModel[] = []
  public cargando  = false
  public sportTypeForm : FormGroup = new FormGroup({})
  closerResult : string = ''
  constructor(
    private sportTypeService:SportTypeService,
    private fb:FormBuilder,
    private modalService:NgbModal,
    private fieldService :FieldService
  ){

  }

  ngOnInit(): void {
    this.sportTypeForm = this.fb.group({
      nombre: ['',[Validators.required]],
      descripcion:['',[Validators.required]],
      cancha_id : ['',[Validators.required]]
    })
    this.getFields()
    this.getSportype()
  }

  getSportype(){
    this.cargando = true
    this.sportTypeService.getRecordList().subscribe({
      next:((data : SportTypeModel[]) =>{
        console.log('data sportye ', data)
        this.sportTypeList = data
        this.cargando = false
      }),
      error:(err) => Swal.fire('Error','Sin registros','error')
    })

  }



  saveSporType(){
    console.log(this.sportTypeForm.value)
    this.sportTypeService.saveRecord(this.sportTypeForm.value).subscribe({
      next:((resp:any) =>{
        console.log(resp)
        this.modalService.dismissAll('Successfully created Goal');
        Swal.fire('Creado','field creado correctamente','success')
        this.getSportype()
      }),
    error(err) {
        console.log(err)
        Swal.fire('Error','no se pudo crear registro','error')
    },
    })
  }


  getFields(){
    this.fieldService.getRecordList().subscribe({
      next:((resp) =>{
        this.fieldList = resp
      }),
      error(err) {
        console.log(err)
          Swal.fire('Error','No se puedieron obtener las canchas','error')
      },
    })
  }


  removeSportType(sportType:SportTypeModel){
    Swal.fire({
      title:'Borrar SportType?',
      text:`Esta a punt de borrar a ${sportType.rating}`,
      icon:'question',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText: 'Yes, Borrarlo'
    }).then(( result) =>{
      if(result.isConfirmed){
        this.sportTypeService.removeRecord(sportType.id!).subscribe({
          next:((value:any) =>{
            Swal.fire('Registo', `${sportType.rating} eliminado correctamente`, 'success')
            this.getSportype()
          })
        })
      }
    })
  }

  // zona modal


  open(content:any){
    this.modalService.open(content,{ariaDescribedBy:'modela-basic-title'}).result.then((result: any) =>{
      this.closerResult = `Closed with ${result}`
    },(reason: any) =>{
      this.closerResult = `Dismissed ${this.getDismissReason(reason)}`
    })
  }

  private getDismissReason(reason:any):string{
    if (reason === ModalDismissReasons.ESC) {
      return 'By pressing ESC'
    }else if (reason === ModalDismissReasons.BACKDROP_CLICK){
      return 'By clicking on a backdrop'
    }else{
      return `$with ${reason}`
    }
  }

}
