import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SignatureService {
  private apiUrl = 'http://localhost:3000'; // URL to your Node.js server

  constructor(private http: HttpClient) { }

  startSignature(certificateContent: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // you may add additional body fields to this request if you need to
    const body = { certificateContent };

    return this.http.post(`${this.apiUrl}/start-signature`, body, { headers });  
  }

  finishSignature(signature: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { signature };

    return this.http.post(`${this.apiUrl}/finish-signature`, body, { headers });
  }
}
