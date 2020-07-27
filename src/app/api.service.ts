import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiURL = `http://192.168.100.12:3001`;
  constructor(
    private http: HttpClient,
  ) {

  }

  public login(code:string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
      'Accept': 'application/json',
      //'Authorization': 'Bearer ' + token
    });
    return this.http.post(`${this.apiURL}/v1/login/`, { code: code }, { headers: headers });
  }
  
  public listAll(token:string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
      'Accept': 'application/json',
    });
    return this.http.get(`${this.apiURL}/v1/listAll/` + token,{ headers: headers });
  }
}
