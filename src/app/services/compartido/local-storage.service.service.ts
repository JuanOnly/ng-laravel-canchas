import { Injectable } from '@angular/core';
import { SessionData } from 'src/app/models/auth/sesion-datos';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageServiceService {

  constructor() { }


  SaveSessionData(data: SessionData): boolean {
    let saved = localStorage.getItem("session-data");

    if (saved) {
      return false;
    } else {
      let stringData = JSON.stringify(data);
      localStorage.setItem("session-data", stringData);

      return true;
    }
  }
  GetSessionInfo(): SessionData {
    let currentData = localStorage.getItem('session-data');
    if (currentData) {
      let sessionDataJson = JSON.parse(currentData);
      console.log(`Informacion Session ${sessionDataJson.usuario.id}`);
      return sessionDataJson;
    } else {
      console.log('1');
      return new SessionData();
    
    }
  }

  RemoveSessionData() {
    localStorage.removeItem("session-data");
  }

  GetToken(): string {
    let saved = localStorage.getItem("session-data");

    if (saved) {
      let data = JSON.parse(saved);
      return data.tokens;
    }
    console.log("Token not saved");

    return "";
  }
}
