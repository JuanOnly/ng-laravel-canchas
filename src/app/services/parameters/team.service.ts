import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationData } from 'src/app/config/configurationData';
import { TeamModel } from 'src/app/models/parameters/Team.model';
@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private url = ConfigurationData.BUSSINESS_MS_URL
  constructor(private http: HttpClient) { }

  public getRecords():Observable<TeamModel[]>{
    return this.http.get<TeamModel[]>(`${this.url}/api/teams`)
  }

  saveRecord(data:TeamModel){
    return this.http.post<TeamModel>(`${this.url}/api/teams`,{
       name:data.name
    })
  }



  editRecord(team:TeamModel){
    console.log('edit team',team)
    return this.http.put<TeamModel>(`${this.url}/api/teams/${team.id}`,{
      id:team.id,
      name:team.name
    })
  }

   removeRecord(team:TeamModel): Observable<any> {
    return this.http.delete<any>(`${this.url}/api/teams/${team.id}`);
   }

}
