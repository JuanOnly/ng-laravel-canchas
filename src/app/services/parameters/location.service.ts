import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationData } from 'src/app/config/configurationData';
import { LocationModel } from 'src/app/models/parameters/Location.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  url: string = ConfigurationData.BUSSINESS_MS_URL;
  constructor(private http: HttpClient) {}

  saveRecord(data: LocationModel): Observable<LocationModel> {
    console.log(data);
    return this.http.post<LocationModel>(`${this.url}/api/profiles`, {
      user_id: data.user_id,
      phone_number: data.phone_number,
      url_facebook: data.url_facebook,
      url_avatar: data.url_avatar,
    });
  }

  getRecordList(): Observable<LocationModel[]> {
    console.log(`${this.url}/api/Locations`);
    return this.http.get<LocationModel[]>(`${this.url}/api/profiles`);
  }

  SearchRecord(id: NumberConstructor): Observable<LocationModel> {
    return this.http.get<LocationModel>(`${this.url}/api/profiles/${id}`);
  }

  EditRecord(data: LocationModel): Observable<LocationModel> {
    return this.http.put<LocationModel>(`${this.url}/api/profiles/${data.id}`, {
      id: data.id,
      user_id: data.user_id,
      phone_number: data.phone_number,
      url_facebook: data.url_facebook,
      url_avatar: data.url_avatar,
    });
  }

  RemoveRecord(id: BigInt): Observable<any> {
    return this.http.delete<any>(`${this.url}/api/profiles/${id}`);
  }
}
