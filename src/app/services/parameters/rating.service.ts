import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationData } from 'src/app/config/configurationData';
import { RatingModel } from 'src/app/models/security/Rating.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  url: string = ConfigurationData.BUSSINESS_MS_URL;
  constructor(private http: HttpClient) {}

  saveRecord(data: RatingModel): Observable<RatingModel> {
    console.log(data);
    return this.http.post<RatingModel>(`${this.url}/api/ratings`, {
      field_id: data.field_id,
      comment: data.comment,
      rating: data.rating,
    });
  }

  getRecordList(): Observable<RatingModel[]> {
    console.log(`${this.url}/api/ratings`);
    return this.http.get<RatingModel[]>(`${this.url}/api/ratings`);
  }

  SearchRecord(id: NumberConstructor): Observable<RatingModel> {
    return this.http.get<RatingModel>(`${this.url}/api/ratings/${id}`);
  }

  EditRecord(data: RatingModel): Observable<RatingModel> {
    return this.http.put<RatingModel>(`${this.url}/api/ratings/${data.id}`, {
      id: data.id,
      field_id: data.field_id,
      comment: data.comment,
      rating: data.rating,
    });
  }

  RemoveRecord(id: BigInt): Observable<any> {
    return this.http.delete<any>(`${this.url}/api/ratings/${id}`);
  }
}
