import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { signal } from '@angular/core';
import { ChatHubService } from '../../../Service/Message/chat-hub.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  IsRecording = signal(false);

  private mediaRecorder ?: MediaRecorder ; 
  private audioChucks : Blob[] = [];
  private mediaStream ?: MediaStream;
  private StartTime = 0;

  messages: any[] = [];

  newMessage = '';

  receiverId = 2;

  private messageSubscription!: Subscription;

  constructor(
    private http: HttpClient,
    private chatHub: ChatHubService
  ) { }

  ngOnInit(): void {

    const token = localStorage.getItem('token');

    if (token) {
      this.chatHub.startConnection(token);
    }

    this.loadMessages();

    this.messageSubscription =
      this.chatHub.messages$
      .subscribe(message => {

        this.messages.push(message);

      });

  }


  loadMessages() {

    this.http.get<any[]>(
      `https://localhost:7077/api/message/${this.receiverId}`
    )
    .subscribe({

      next: (data) => {

        this.messages = data;

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  sendMessage() {

    if (this.newMessage.trim() === '') {
      return;
    }

    const body = {

      messageText: this.newMessage

    };

    this.http.post(
      `https://localhost:7077/api/message/${this.receiverId}`,
      body
    )
    .subscribe({

      next: () => {

        this.newMessage = '';

      },

      error: (err) => {

        console.log(err);

      }

    });

  }



  ngOnDestroy(): void {

    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }

    this.chatHub.stopConnection();

  }

}