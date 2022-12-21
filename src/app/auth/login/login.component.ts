import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { userCredentialsModel } from 'src/app/models/auth/credenciales-usuario.model';
import { SessionData } from 'src/app/models/auth/sesion-datos';
import { ReservationModel } from 'src/app/models/reservation/Reservation.model';
import { AuthUsuarioService } from 'src/app/services/auth/auth-usuario.service';
import { LocalStorageServiceService } from 'src/app/services/compartido/local-storage.service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  public reservationList: ReservationModel[] = [];
  public idTeam: BigInt = BigInt(2);

  constructor(
    private fb: FormBuilder,
    private securityServices: AuthUsuarioService,
    private router: Router,
    private localStorageServices: LocalStorageServiceService,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    });
  }


  login() {
    let modelo = new userCredentialsModel(); // Modelo donde podremos utilizar para cojer la informacion que viene desde el login
    modelo.email = this.GetForm['email'].value;
    modelo.password = this.GetForm['password'].value.toString();

    this.securityServices.Login(modelo).subscribe({
      next: (data: SessionData) => {
        if (data.usuario) {
          if (data.usuario.role_id == BigInt(2)) {
            this.localStorageServices.SaveSessionData(data);
            data.isLoggedIn = true;
            this.securityServices.RefreshSessionData(data);
            this.localStorageServices.GetSessionInfo();
            this.router.navigate([""]);
          }
        }

      },
      error: (error: any) => {
        Swal.fire("Error", "Usuario no existente", "error")
      }
    });
  }

  IsThereActiveSession() {
    let data = localStorage.getItem("session-data");
    if (data) {
      let objectData: SessionData = JSON.parse(data);
      objectData.isLoggedIn = true;
      //this.RefreshSessionData(objectData);
    }
  }

  /*RefreshSessionData(data: SessionData) {
    this.sessionDataSubject.next(data);
  }*/

  get GetForm() {
    return this.form.controls;
  }
}
