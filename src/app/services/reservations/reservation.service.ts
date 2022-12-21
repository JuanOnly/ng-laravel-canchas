import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationData } from 'src/app/config/configurationData';
import { ReservationModel } from 'src/app/models/reservation/Reservation.model';

@Injectable({
  providedIn: 'root'
})
export class reservationervice {

  url:string = ConfigurationData.BUSSINESS_MS_URL;
  constructor( private http:HttpClient) { }


  saveRecord(data:ReservationModel):Observable<ReservationModel> {
    console.log('field service',data)
     return this.http.post<ReservationModel>(`${this.url}/api/reservation`,{
          field_id:data.field_id,
          team_id:data.team_id,
          estado:data.estado,
          fechaReserva:data.fechaReserva,
          hora_inicio:data.hora_inicio,
          hora_fin:data.hora_fin
     });

  }

  getRecordList():Observable<ReservationModel[]>{
    console.log(`${this.url}/api/reservation`)
    return this.http.get<ReservationModel[]>(`${this.url}/api/reservation`);



  }


  SearchRecord(id: NumberConstructor): Observable<ReservationModel> {
    return this.http.get<ReservationModel>(`${this.url}/api/reservation/${id}`);
  }

  EditRecord(data: ReservationModel): Observable<ReservationModel> {
    return this.http.put<ReservationModel>(
      `${this.url}/api/reservation/${data.id}`,
      {
          id:data.id,
          field_id:data.field_id,
          team_id:data.team_id,
          estado:data.estado,
          fechaReserva:data.fechaReserva,
          hora_inicio:data.hora_inicio,
          hora_fin:data.hora_fin
      },

    );
  }

  RemoveRecord(id: BigInt): Observable<any> {
    return this.http.delete<any>(`${this.url}/api/reservation/${id}`);
  }
}
