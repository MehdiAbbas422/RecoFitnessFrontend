import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageDto } from '../../Models/Chatting/MessageDto';

@Injectable({
  providedIn: 'root',
})
export class Chat {

  private apiUrl = 'https://localhost:7077/api/Message';

  constructor(private http: HttpClient) {}

  GetMessages(receiverId: number) {
    return this.http.get<any[]>(
      `${this.apiUrl}/${receiverId}`
    );
  }

  GetListOfUsers(keyword: string = '') {
    return this.http.get<any[]>(
      `${this.apiUrl}?keyword=${keyword}`
    );
  }

  SendMessage(dto: MessageDto)
   {

    return this.http.post(
      `${this.apiUrl}/${dto.ReceiverId}`,
      dto
    );

  }

  VoiceMessage(formbody: FormData) {
    return this.http.post(
      `${this.apiUrl}/voice`,
      formbody
    );
  }



}