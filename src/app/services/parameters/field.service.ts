import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'jquery';
import { catchError, Observable, tap } from 'rxjs';
import { ConfigurationData } from 'src/app/config/configurationData';
import { FieldModel } from 'src/app/models/parameters/Field.model';

@Injectable({
  providedIn: 'root'
})
export class FieldService {

  url:string = ConfigurationData.BUSSINESS_MS_URL;
  constructor( private http:HttpClient) { }


  saveRecord(data:FieldModel):Observable<FieldModel> {
    console.log('field service',data)
     return this.http.post<FieldModel>(`${this.url}/api/fields`,{
          id:data.id,
          field_type:data.field_type,
          field_characteristic:data.field_characteristic,
          field_location:data.field_location,
     });

  }

  getRecordList():Observable<FieldModel[]>{
    console.log(`${this.url}/api/fields`)
    return this.http.get<FieldModel[]>(`${this.url}/api/fields`);



  }


  SearchRecord(id: NumberConstructor): Observable<FieldModel> {
    return this.http.get<FieldModel>(`${this.url}/api/fields/${id}`);
  }

  EditRecord(data: FieldModel): Observable<FieldModel> {
    return this.http.put<FieldModel>(
      `${this.url}/api/fields/${data.id}`,
      {
        id:data.id,
        field_type:data.field_type,
        field_characteristic:data.field_characteristic,
        field_location:data.field_location,
      },

    );
  }

  RemoveRecord(id: BigInt): Observable<any> {
    return this.http.delete<any>(`${this.url}/api/fields/${id}`);
  }
}
