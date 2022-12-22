import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReservationModel } from 'src/app/models/parameters/Reservation.models';
import { ReservationService } from 'src/app/services/parameters/reservation.service';
import Swal from 'sweetalert2';
declare const InitSelect: any;

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ReservationComponent {
  closeResult: string = '';
  public cargando: boolean = true;
  public reservationForm: FormGroup = new FormGroup({});
  public reservationsList: ReservationModel[] = [];

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private reservationService: ReservationService
  ) {}
  ngOnInit(): void {
    this.reservationForm = this.fb.group({
      reservation_id: ['', [Validators.required]],
      field_id: ['', [Validators.required]],
      date: ['', [Validators.required]],
      hour: ['', [Validators.required]],
      experation: ['', [Validators.required]],
    });
    this.getReservations();
  }

  getReservations() {
    this.cargando = true;
    this.reservationService.getRecordList().subscribe({
      next: (resp: ReservationModel[]) => {
        console.log(resp[0]);
        this.reservationsList = resp;
        console.log(this.reservationsList);
        this.cargando = false;
      },
      error: (err) =>
        Swal.fire('error', 'No se pudieron obtener los reservation', 'error'),
    });
  }

  saveReservation() {
    console.log('Reservation', this.reservationForm.value);
    this.reservationService.saveRecord(this.reservationForm.value).subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.modalService.dismissAll('Successfully created reservation');
        Swal.fire('Creado', 'reservation creado correctamente', 'success');
        this.getReservations();
      },
      error: (err) =>
        Swal.fire('error', 'No se pudo crear el registro', 'error'),
    });
  }


  removeReservation(reservation: ReservationModel) {
    Swal.fire({
      title: 'Borrar Reservation?',
      text: `Esta a punto de borrar a ${reservation.id}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Borrarlo',
    }).then((result) => {
      if (result.isConfirmed) {
        this.reservationService
          .RemoveRecord(reservation.id!)
          .subscribe((resp) => {
            Swal.fire(
              'Reservation',
              `${reservation.id} eliminado correctamente`,
              'success'
            );
            this.getReservations();
          });
      }
    });
  }

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
