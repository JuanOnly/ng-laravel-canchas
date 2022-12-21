import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FieldTypeModel } from 'src/app/models/parameters/FieldType.model';
import { FieldTypeService } from 'src/app/services/parameters/field-type.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-field-type',
  templateUrl: './edit-field-type.component.html',
  styleUrls: ['./edit-field-type.component.css']
})
export class EditFieldTypeComponent implements OnInit {


  dataForm : FormGroup = new FormGroup({})
  constructor(
      private fb: FormBuilder,
      private router: Router,
      private route: ActivatedRoute,
      private fieldTypeService : FieldTypeService

  ){  }

  ngOnInit(): void {
    this.searchFieldType()
    this.FormBuilding()
  }

  FormBuilding(){
    this.dataForm =  this.fb.group({
      id:['',[Validators.required]],
      nombre:['',[Validators.minLength(2)]],
      descripcion:['',[Validators.minLength(2)]],
      forma:['',[Validators.minLength(2)]],
      superficie:['',[Validators.min(10)]]
    })
  }

  get GetDF(){
    return this.dataForm.controls;
  }
  searchFieldType(){
    let id = this.route.snapshot.params['id'];
    this.fieldTypeService.SearchRecord(id).subscribe({
      next:((data:FieldTypeModel)=>{
             console.log(data)
             this.GetDF['id'].setValue(data.id);
             this.GetDF['nombre'].setValue(data.nombre);
             this.GetDF['descripcion'].setValue(data.descripcion);
             this.GetDF['forma'].setValue(data.forma);
             this.GetDF['superficie'].setValue(data.superficie);
        }),
        error:(err) => Swal.fire('Error','No se puedo encontrar el registro','error')
      })
  }


  editFieldType(){
    let model = new FieldTypeModel(
      this.GetDF['nombre'].value,
      this.GetDF['descripcion'].value,
      this.GetDF['forma'].value,
      this.GetDF['superficie'].value,
      this.GetDF['id'].value
    )
    this.fieldTypeService.EditRecord(model).subscribe({
      next:((data) =>{
        Swal.fire('Actualizado',`Field type ${data.nombre} actualizado correctamente`,'success')
        this.router.navigate(['/parameters/fieldType-list'])
      }),
      error:err=> Swal.fire('Actualizado',`No se pudo actualizar el registro`,'error')
    })
  }

}
