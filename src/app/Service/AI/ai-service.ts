import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AiService {
  private apiUrl = 'https://localhost:7077/api/AI';

  constructor(private http: HttpClient) {}

  Chatting(userMessage: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // C# DTO { message: "..." } ke mutabiq object payload
    const body = {
      message: userMessage
    };

    // { headers } ko object format mein pass karna lazmi hai
    return this.http.post(`${this.apiUrl}/Ai`, body, { headers });
  }
}