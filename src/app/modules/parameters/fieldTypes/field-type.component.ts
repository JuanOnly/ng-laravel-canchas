import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FieldTypeModel } from 'src/app/models/parameters/FieldType.model';
import { FieldTypeService } from 'src/app/services/parameters/field-type.service';
import { OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-field-type',
  templateUrl: './field-type.component.html',
  styleUrls: ['./field-type.component.css']
})

export class FieldTypeComponent implements OnInit {
  closeResult: string = '';
  public cargando:boolean = true
  public fieldTypeForm:FormGroup = new FormGroup({})
  public fieldTypes:FieldTypeModel[] = []

  constructor(
    private fb:FormBuilder,
    private modalService: NgbModal,
    private fieldTypeervice:FieldTypeService
  ){

  }
  ngOnInit(): void {
    this.fieldTypeForm = this.fb.group({
      nombre: ['',[Validators.required]],
      descripcion:['',[Validators.required]],
      forma:['',[Validators.required]],
      superficie:['',[Validators.maxLength(2)]]
    })

    this.getFieldTypes()
  }

  saveFieldTypes(){
    this.fieldTypeervice.saveRecord(this.fieldTypeForm.value).subscribe({
      next:(( resp : FieldTypeModel) =>{
        this.modalService.dismissAll('Successfully created Goal');
        Swal.fire('Creado',`fieldType creado correctamente`,'success')
        this.getFieldTypes()
      }),
      error:(err)=> Swal.fire('Error','No se puedo guardar','error')
    })

  }

  getFieldTypes(){
    this.cargando = true
    this.fieldTypeervice.getRecordList().
    subscribe({
      next:((resp : FieldTypeModel[]) =>{
        this.fieldTypes = resp
        this.cargando = false
      }),
         error: (err)=> Swal.fire('Error','Algo ha sucedido','error')
      }
    )
  }

  removeFieldTypes(fieldType:FieldTypeModel){

    Swal.fire({
      title: 'Borrar FieldType?',
      text: `Esta a punto de borrar a ${fieldType.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.fieldTypeervice.RemoveRecord(fieldType.id!).
        subscribe( resp =>{
          console.log('respuesta ',resp)
          Swal.fire('Registo',`${fieldType.nombre} eliminado correctamente`,'success')
          this.getFieldTypes()
      })
      }
    })
  }




    open(content:any) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
