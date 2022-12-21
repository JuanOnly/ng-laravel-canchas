import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'jquery';
import { Observable } from 'rxjs';
import { ConfigurationData } from 'src/app/config/configurationData';
import { FieldModel } from 'src/app/models/parameters/Field.model';
import { FieldTypeModel } from 'src/app/models/parameters/FieldType.model';
@Injectable({
  providedIn: 'root'
})
export class FieldTypeService {

  private url = ConfigurationData.BUSSINESS_MS_URL
  constructor(private http:HttpClient) { }

  saveRecord(data:FieldTypeModel):Observable<FieldTypeModel> {
    console.log(data)
     return this.http.post<FieldTypeModel>(`${this.url}/api/fieldType`,{
        nombre:data.nombre,
        descripcion:data.descripcion,
        forma:data.forma,
        superficie:data.superficie
     });

  }

  getRecordList():Observable<FieldTypeModel[]>{
    console.log(`${this.url}/api/fieldType`)
    return this.http.get<FieldTypeModel[]>(`${this.url}/api/fieldType`)

  }


  SearchRecord(id:bigint): Observable<FieldTypeModel> {
    return this.http.get<FieldTypeModel>(`${this.url}/api/fieldType/${id}`);
  }

  EditRecord(data: FieldTypeModel): Observable<FieldTypeModel> {
    console.log(data)
    return this.http.put<FieldTypeModel>(
      `${this.url}/api/fieldType/${data.id}`,
      {
        id: data.id,
        nombre:data.nombre,
        descripcion:data.descripcion,
        forma:data.forma,
        superficie:data.superficie
      },

    );
  }

  RemoveRecord(id: BigInt): Observable<any> {
    return this.http.delete<any>(`${this.url}/api/fieldType/${id}`);
  }
}
