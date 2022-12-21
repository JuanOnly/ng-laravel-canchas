import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
declare var tooltipList: any;
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LocationService } from 'src/app/services/parameters/location.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationModel } from 'src/app/models/parameters/Location.model';
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
})
export class LocationComponent implements OnInit {
  closeResult: string = '';
  formModal: any;
  public cargando: boolean = true;
  public locationForm: FormGroup = new FormGroup({});
  public locations: LocationModel[] = [];
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private locationService: LocationService
  ) {}
  ngOnInit(): void {
    this.locationForm = this.fb.group({
      user_id: ['', Validators.required],
      phone_number: ['', Validators.required],
      url_facebook: ['', Validators],
      url_avatar: ['', Validators],
    });

    this.getLocations();
  }

  getLocations() {
    this.cargando = true;
    this.locationService.getRecordList().subscribe({
      next: (resp: LocationModel[]) => {
        this.locations = resp;
        console.log(this.locations);
        this.cargando = false;
      },
      error: (err) => console.log('error' + err),
    });
  }

  saveLocations() {
    console.log('datos', this.locationForm.value);
    this.locationService
      .saveRecord(this.locationForm.value)
      .subscribe((resp: any) => {
        console.log(resp);
        this.modalService.dismissAll('Successfully created Goal');
        Swal.fire('Creado', `location creado correctamente`, 'success');
        this.getLocations();
      });
  }

  eliminarLocation(location: LocationModel): void {
    console.log(location.id);

    Swal.fire({
      title: 'Borrar Profile?',
      text: `Esta a punto de borrar a ${location.user_id}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Borrarlo',
    }).then((result) => {
      if (result.isConfirmed) {
        this.locationService.RemoveRecord(location.id!).subscribe((resp) => {
          Swal.fire(
            'Registo',
            `${location.user_id} eliminado correctamente`,
            'success'
          );
          this.getLocations();
        });
      }
    });
  }

  async abrilSweetAlert() {
    const { value } = await Swal.fire<string>({
      title: 'Crear ubicacion',
      text: 'Ingrese nombre de la ubicacion',
      input: 'text',
      inputPlaceholder: 'Nombre ubicacion',
      showCancelButton: true,
    });
  }

  // if(value?.trim().length! > 0){
  //   this.hospitalService.crearHospital(value!).subscribe( (resp:any) => {
  //       this.hospitales.push(resp.hospital)
  //   })

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result: any) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason: any) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
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
