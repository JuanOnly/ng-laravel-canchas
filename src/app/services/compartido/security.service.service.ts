import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ConfigurationData } from 'src/app/config/configurationData';
import { SessionData } from 'src/app/models/auth/sesion-datos';

@Injectable({
  providedIn: 'root'
})
export class SecurityServiceService {

  sessionDataSubject: BehaviorSubject<SessionData> = new BehaviorSubject<SessionData>(new SessionData());
  //url: string = ConfigurationData;

  constructor(
    private http: HttpClient
  ) {
    this.IsThereActiveSession();
  }

  IsThereActiveSession() {
    let data = localStorage.getItem("session-data");
    if (data) {
      let objectData: SessionData = JSON.parse(data);
      objectData.isLoggedIn = true;
      this.RefreshSessionData(objectData);
    }
  }

  RefreshSessionData(data: SessionData) {
    this.sessionDataSubject.next(data);
  }

  GetSessionStatus() {
    return this.sessionDataSubject.asObservable();
  }
}
