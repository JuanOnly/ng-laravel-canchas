import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationData } from 'src/app/config/configurationData';
import { RolModel } from 'src/app/models/security/Rol.model';

@Injectable({
  providedIn: 'root',
})
export class RolService {
  url: string = ConfigurationData.BUSSINESS_MS_URL;

  constructor(private http: HttpClient) {}

  saveRecord(data: RolModel): Observable<RolModel> {
    return this.http.post<RolModel>(`${this.url}/api/roles`, {
      nombre: data.name,
    });
  }

  getRecordList(): Observable<RolModel[]> {
    return this.http.get<RolModel[]>(`${this.url}/api/roles`);
  }

  searchRecord(id: BigInt) {
    return this.http.get<RolModel>(`${this.url}/api/roles/${id}`);
  }

  editRecord(data: RolModel): Observable<RolModel> {
    return this.http.put<RolModel>(`${this.url}/api/roles/${data.id}`, {
      nombre: data.name,
    });
  }

  removeRecord(id: BigInt): Observable<any> {
    return this.http.delete<any>(`${this.url}/api/roles/${id}`);
  }
}
