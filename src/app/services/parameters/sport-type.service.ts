import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationData } from 'src/app/config/configurationData';
import { SportTypeModel } from 'src/app/models/parameters/SportType.model';
@Injectable({
  providedIn: 'root',
})
export class SportTypeService {
  private url: string = ConfigurationData.BUSSINESS_MS_URL;

  constructor(private http: HttpClient) {}

  saveRecord(data: SportTypeModel): Observable<SportTypeModel> {
    console.log(SportTypeModel);
    return this.http.post<SportTypeModel>(`${this.url}/api/ratings`, {
      id: data.id,
      rating: data.rating,
      comment: data.comment,
      field_id: data.field_id,
    });
  }

  getRecordList(): Observable<SportTypeModel[]> {
    console.log('sport type model', SportTypeModel);
    return this.http.get<SportTypeModel[]>(`${this.url}/api/ratings`);
  }

  searchRecord(id: BigInt): Observable<SportTypeModel> {
    return this.http.get<SportTypeModel>(`${this.url}/api/ratings/${id}`);
  }

  editRecord(data: SportTypeModel): Observable<SportTypeModel> {
    return this.http.put<SportTypeModel>(`${this.url}/api/ratings`, {
      id: data.id,
      rating: data.rating,
      comment: data.comment,
      field_id: data.field_id,
    });
  }

  removeRecord(id: BigInt): Observable<any> {
    return this.http.delete<any>(`${this.url}/api/ratings/${id}`);
  }
}
