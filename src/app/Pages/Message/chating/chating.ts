import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Authservice } from '../../../Service/AuthService/authservice';
import { Chat } from '../../../Service/Message1/chat';
import { MessageDto } from '../../../Models/Chatting/MessageDto';
import {ChangeDetectorRef} from '@angular/core';
import { signal } from '@angular/core';

@Component({
  selector: 'app-chating',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chating.html',
  styleUrls: ['./chating.css'],
})
export class Chating implements OnInit {


 IsRecording = signal(false);

  private mediaRecorder ?: MediaRecorder ; 
  private audioChucks : Blob[] = [];
  private mediaStream ?: MediaStream;
  private StartTime = 0;

  ChattingList: any[] = [];

  receiverId!: number;

  newMessage: string = '';

  currentUserId!: number;
  receiverName!: string;

Keyword: string = '';
  Users: any[] = [];

  constructor(
    private chatService: Chat,
    private route: ActivatedRoute,
    private authService: Authservice,
    private cdr :ChangeDetectorRef
  ) {}

  ngOnInit(): void {


    this.currentUserId = Number(this.authService.GetId());
    
    this.GetList(this.Keyword);

  }

  loadMessages(receiverId: number): void {

    this.chatService.GetMessages(receiverId).subscribe(data => {

      this.ChattingList = data;

      console.log('Messages loaded:', data);
      this.cdr.detectChanges()

    });

  }

  SendMessage(): void {

    if (!this.newMessage.trim()) return;

    const dto: MessageDto = {

      ReceiverId: this.receiverId,

      MessageText: this.newMessage,

      Image : '1234556' // Placeholder for image, replace with actual image data if needed  

    };

    this.chatService.SendMessage(dto).subscribe({

      next: () => {

        this.newMessage = '';

        this.loadMessages(this.receiverId);

      },

      error: err => console.log(err)

    });

  }

  
  GetList(Keyword?: string): void {
    try{
    this.chatService.GetListOfUsers(Keyword).subscribe((data) => {
      this.Users = data;
      console.log('Users List:', this.Users); // Final list dekhein
    this.cdr.detectChanges()
    });}
    catch(error){
      console.error('Error fetching users:', error);
    }
  }

  async StartRecording()  {
    try{
        this.audioChucks = [];
        this.mediaStream= await navigator.mediaDevices.getUserMedia({audio:true});
         this.mediaRecorder = new MediaRecorder(this.mediaStream);
        this.StartTime = Date.now();
        
        this.mediaRecorder.ondataavailable =(e)=>
        {
          if(e.data.size>0)
          {
            this.audioChucks.push(e.data);
          }
        }
        
        this.IsRecording.set(true);
        this.mediaRecorder.start();
    }
    catch(err) {
      console.log(err);
    }
  }
  
  async stopRecording()
  {
      if (!this.mediaRecorder || this.mediaRecorder.state === 'inactive') return;

    this.mediaRecorder.onstop = ()=>
    {
        const duration = Math.floor((Date.now() - this.StartTime) / 1000);
        const audioBlod = new Blob(this.audioChucks,  {type: 'audio/webm'});
        const voice =  new File([audioBlod], 'voice.webm', {type: ' audio/webm'});
      const recivedId = this.receiverId;
      if (!voice && !recivedId) return;
      this.SendVoice(voice, duration, recivedId);
      
      this.mediaStream?.getTracks().forEach(track => track.stop());
      this.IsRecording.set(false);

      }

this.mediaRecorder.stop();
this.mediaStream= await navigator.mediaDevices.getUserMedia({audio:false});
    }


    private SendVoice(voice: File, duration: number, receiverId: number) 
    {
        const formData = new FormData();
        formData.append('voice', voice);
        formData.append('voiceDuration', duration.toString());
        formData.append('receiverId', receiverId.toString());
        this.chatService.VoiceMessage(formData).subscribe({
          next: () => {
            console.log('Voice message sent successfully');
        this.loadMessages(receiverId);
          },
          error: (err) => {
            console.error('Error sending voice message:', err);
          }
        });
    }


  OpenChat(userId:number, userName:string):void{
    this.receiverId = userId;
    this.receiverName = userName;
    this.loadMessages(this.receiverId);
  }

}