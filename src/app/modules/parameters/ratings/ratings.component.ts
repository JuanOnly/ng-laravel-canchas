import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
declare var tooltipList: any;
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RatingService } from 'src/app/services/parameters/rating.service';
import { RatingModel } from 'src/app/models/security/Rating.model';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css'],
})
export class RatingsComponent implements OnInit {
  closeResult: string = '';
  formModal: any;
  public cargando: boolean = true;
  public RatingForm: FormGroup = new FormGroup({});
  public Ratings: RatingModel[] = [];
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private RatingService: RatingService
  ) {}
  ngOnInit(): void {
    this.RatingForm = this.fb.group({
      field_id: ['', Validators.required],
      comment: ['', Validators.required],
      raiting: ['', Validators.required],
    });

    this.getRatings();
  }

  getRatings() {
    this.cargando = true;
    this.RatingService.getRecordList().subscribe({
      next: (resp: RatingModel[]) => {
        this.Ratings = resp;
        console.log(this.Ratings);
        this.cargando = false;
      },
      error: (err) => console.log('error' + err),
    });
  }

  saveRatings() {
    console.log('datos', this.RatingForm.value);
    this.RatingService.saveRecord(this.RatingForm.value).subscribe(
      (resp: any) => {
        console.log(resp);
        this.modalService.dismissAll('Successfully created a rating');
        Swal.fire('Creado', `Rating creado correctamente`, 'success');
        this.getRatings();
      }
    );
  }

  eliminarRatings(rating: RatingModel): void {
    console.log(rating.id);

    Swal.fire({
      title: 'Borrar Profile?',
      text: `Esta a punto de borrar a ${rating.id}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Borrarlo',
    }).then((result) => {
      if (result.isConfirmed) {
        this.RatingService.RemoveRecord(rating.id!).subscribe((resp: any) => {
          Swal.fire(
            'Registo',
            `${rating.id} eliminado correctamente`,
            'success'
          );
          this.getRatings();
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
