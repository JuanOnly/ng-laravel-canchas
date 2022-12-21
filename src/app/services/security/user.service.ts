import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationData } from 'src/app/config/configurationData';
import { UserModel } from 'src/app/models/security/User.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url: string = ConfigurationData.BUSSINESS_MS_URL;

  constructor(private http: HttpClient) {}

  saveRecord(data: UserModel): Observable<UserModel> {
    console.log('Data user ', data);
    return this.http.post<UserModel>(`${this.url}/api/users`, {
      name: data.name,
      email: data.email,
      password: data.password,
      role_id: data.role_id,
    });
  }

  getRecordList(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.url}/api/users`);
  }

  searchRecord(id: BigInt) {
    return this.http.get<UserModel>(`${this.url}/api/users/${id}`);
  }

  editRecord(data: UserModel): Observable<UserModel> {
    console.log('edit user', data);
    return this.http.put<UserModel>(`${this.url}/api/users/${data.id}`, {
      name: data.name,
      email: data.email,
      password: data.password,
      role_id: data.role_id,
    });
  }

  removeRecord(id: BigInt): Observable<any> {
    return this.http.delete<any>(`${this.url}/api/users/${id}`);
  }
}
