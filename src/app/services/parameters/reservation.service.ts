import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationData } from 'src/app/config/configurationData';
import { ReservationModel } from 'src/app/models/parameters/Reservation.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  url: string = ConfigurationData.BUSSINESS_MS_URL;
  constructor(private http: HttpClient) {}

  saveRecord(data: ReservationModel): Observable<ReservationModel> {
    console.log(data);
    return this.http.post<ReservationModel>(`${this.url}/api/reservations`, {
      team_id: data.team_id,
      field_id: data.field_id,
      date: data.date,
      hour: data.hour,
      experation: data.experation,
    });
  }

  getRecordList(): Observable<ReservationModel[]> {
    console.log(`${this.url}/api/reservations`);
    return this.http.get<ReservationModel[]>(`${this.url}/api/reservations`);
  }

  SearchRecord(id: NumberConstructor): Observable<ReservationModel> {
    return this.http.get<ReservationModel>(`${this.url}/api/reservations/${id}`);
  }

  EditRecord(data: ReservationModel): Observable<ReservationModel> {
    return this.http.put<ReservationModel>(`${this.url}/api/reservations/${data.id}`, {
      id: data.id,
      team_id: data.team_id,
      field_id: data.field_id,
      date: data.date,
      hour: data.hour,
      experation: data.experation,
    });
  }

  RemoveRecord(id: BigInt): Observable<any> {
    return this.http.delete<any>(`${this.url}/api/reservations/${id}`);
  }
}
