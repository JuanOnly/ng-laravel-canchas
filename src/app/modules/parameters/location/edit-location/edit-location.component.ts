import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationModel } from 'src/app/models/parameters/Location.model';
import { LocationService } from 'src/app/services/parameters/location.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.css'],
})
export class EditLocationComponent implements OnInit {
  dataForm: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private service: LocationService
  ) {}
  ngOnInit(): void {
    this.FormBuilding();
    this.SearchRecord();
  }

  FormBuilding() {
    this.dataForm = this.fb.group({
      id: ['', [Validators.required]],
      user_id: ['', [Validators]],
      phone_number: ['', [Validators]],
      url_facebook: ['', [Validators]],
      url_avatar: ['', [Validators]],
    });
  }
  get GetDF() {
    return this.dataForm.controls;
  }
  SearchRecord() {
    let id = this.route.snapshot.params['id'];
    console.log('encontre id', id);
    this.service.SearchRecord(id).subscribe({
      next: (data: LocationModel) => {
        console.log(data);
        this.GetDF['id'].setValue(data.id);
        this.GetDF['user_id'].setValue(data.user_id);
        this.GetDF['phone_number'].setValue(data.phone_number);
        this.GetDF['url_facebook'].setValue(data.url_facebook);
        this.GetDF['url_avatar'].setValue(data.url_avatar);
      },
    });
  }

  editRecord() {
    let model = new LocationModel(
      this.GetDF['user_id'].value,
      this.GetDF['phone_number'].value,
      this.GetDF['url_facebook'].value,
      this.GetDF['url_avatar'].value,
      this.GetDF['id'].value
    );

    console.log('modelo', model);
    this.service.EditRecord(model).subscribe({
      next: (data: LocationModel) => {
        Swal.fire(
          'Actualizado',
          `location ${data.user_id} actualizado correctamente`,
          'success'
        );
        this.router.navigate(['/parameters/location-list']);
      },
    });
  }
}
