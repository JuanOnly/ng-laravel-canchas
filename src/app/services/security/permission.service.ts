import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationData } from 'src/app/config/configurationData';
import { PermissionModel } from 'src/app/models/security/Permission.model';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  url:string = ConfigurationData.BUSSINESS_MS_URL

  constructor(
    private http:HttpClient
  ) { }

  // public id?:bigint,
  // public url?:string,
  // public method?:string
  saveRecord(data:PermissionModel):Observable<PermissionModel>{
    return this.http.post<PermissionModel>(`${this.url}/api/permissions`,{
      url:data.url,
      method:data.method
    })
  }

  getRecordList():Observable<PermissionModel[]>{
    return this.http.get<PermissionModel[]>(`${this.url}/api/permissions`)
  }

  searchRecord(id:BigInt){
    return this.http.get<PermissionModel>(`${this.url}/api/permissions/${id}`)
  }

  editRecord(data:PermissionModel):Observable<PermissionModel>{
    return this.http.put<PermissionModel>(`${this.url}/api/permissions/${data.id}`,{
      id:data.id,
      url:data.url,
      method:data.method
    })
  }

  removeRecord(id:BigInt):Observable<any>{
    return this.http.delete<any>(`${this.url}/api/permissions/${id}`)
  }

}
