import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FieldModel } from 'src/app/models/parameters/Field.model';
import { FieldTypeModel } from 'src/app/models/parameters/FieldType.model';
import { LocationModel } from 'src/app/models/parameters/Location.model';
import { FieldTypeService } from 'src/app/services/parameters/field-type.service';
import { FieldService } from 'src/app/services/parameters/field.service';
import { LocationService } from 'src/app/services/parameters/location.service';
import Swal from 'sweetalert2';
declare const InitSelect: any;
@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css'],
})
export class FieldComponent implements OnInit {
  closeResult: string = '';
  public cargando: boolean = true;
  public fieldForm: FormGroup = new FormGroup({});
  public fields: FieldModel[] = [];
  public fieldTypes: FieldTypeModel[] = [];
  public locations: LocationModel[] = [];
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private fieldService: FieldService,
    private fieldTypeService: FieldTypeService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.fieldForm = this.fb.group({
      field_type: ['', [Validators.required]],
      field_characteristic: ['', [Validators.required]],
      field_location: ['', [Validators.required]],

      //rating_id: ['', [Validators.required]]
      //teams_id: ['', [Validators.required]]
    });
    // this.getFieldTypes(); //getTeams
    // this.getLocations(); // getRatings
    this.getFields();
  }

  getFields() {
    this.cargando = true;
    this.fieldService.getRecordList().subscribe({
      next: (resp: FieldModel[]) => {
        // resp.forEach((element: any) => {
        //     console.log(element.field_types)
        // });
        console.log(resp[0]);
        this.fields = resp;
        console.log(this.fields);
        this.cargando = false;
      },
      error: (err) =>
        Swal.fire('error', 'No se pudieron obtener los registros', 'error'),
    });
  }

  saveField() {
    console.log('Field', this.fieldForm.value);
    this.fieldService.saveRecord(this.fieldForm.value).subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.modalService.dismissAll('Successfully created Goal');
        Swal.fire('Creado', 'field creado correctamente', 'success');
        this.getFields();
      },
      error: (err) =>
        Swal.fire('error', 'No se pudo crear el registro', 'error'),
    });
  }

  removeField(field: FieldModel) {
    Swal.fire({
      title: 'Borrar Field?',
      text: `Esta a punto de borrar a ${field.field_location}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Borrarlo',
    }).then((result) => {
      if (result.isConfirmed) {
        this.fieldService.RemoveRecord(field.id!).subscribe((resp) => {
          Swal.fire(
            'Registo',
            `${field.field_location} eliminado correctamente`,
            'success'
          );
          this.getFields();
        });
      }
    });
  }

  // getFieldTypes() { change to ratings
  //   this.fieldTypeService.getRecordList().subscribe({
  //     next: (resp) => {
  //       this.fieldTypes = resp;
  //     },
  //     error: (err) =>
  //       Swal.fire('error', 'error al obtener los registros', 'error'),
  //   });
  // }

  // Zona Modal
  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modela-basic-title' })
      .result.then(
        (result: any) => {
          this.closeResult = `Closed with ${result}`;
        },
        (reason: any) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'By pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with ${reason}`;
    }
  }
}
