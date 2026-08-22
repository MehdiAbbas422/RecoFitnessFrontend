import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatHubService {

  private hubConnection!: signalR.HubConnection;

  private messageSubject = new Subject<any>();

  public messages$ = this.messageSubject.asObservable();

  constructor() { }

  startConnection(token: string) {

    this.hubConnection = new signalR.HubConnectionBuilder()

      .withUrl('https://localhost:7077/chatHub', {
        accessTokenFactory: () => token
      })

      .withAutomaticReconnect()

      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('SignalR Connected');
      })
      .catch(err => {
        console.log('Connection Error : ', err);
      });

    this.hubConnection.on('ReceiveMessage', (message) => {

      this.messageSubject.next(message);

    });

  }

  stopConnection() {

    if (this.hubConnection) {
      this.hubConnection.stop();
    }

  }

}