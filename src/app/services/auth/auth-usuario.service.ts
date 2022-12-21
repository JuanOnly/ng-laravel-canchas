import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ConfigurationData } from 'src/app/config/configurationData';
import { userCredentialsModel } from 'src/app/models/auth/credenciales-usuario.model';
import { SessionData } from 'src/app/models/auth/sesion-datos';
import { TeamModel } from 'src/app/models/parameters/Team.model';
import { ReservationModel } from 'src/app/models/reservation/Reservation.model';

@Injectable({
  providedIn: 'root'
})
export class AuthUsuarioService {

  sessionDataSubject: BehaviorSubject<SessionData> = new BehaviorSubject<SessionData>(new SessionData());
  private url = ConfigurationData.BUSSINESS_MS_URL
  constructor(private http: HttpClient) { }

  Login(modelo: userCredentialsModel): Observable<SessionData> {
    console.log(modelo.email, modelo.password);

    return this.http.post<SessionData>(`${this.url}/api/login`, {
      email: modelo.email,
      password: modelo.password,
    });
  }

  obtenerReservas(): Observable<ReservationModel[]> {
    return this.http.get<ReservationModel[]>(`${this.url}/api/reservation`);
  }

  obtenerEquipo(name: String): Observable<TeamModel> {
    return this.http.get<TeamModel>(`${this.url}/api/team/${name}`);
  }

  RefreshSessionData(data: SessionData) {
    this.sessionDataSubject.next(data);
  }
}
