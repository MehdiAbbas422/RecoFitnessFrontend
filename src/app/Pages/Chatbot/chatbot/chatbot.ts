import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiService } from '../../../Service/AI/ai-service'; 
import { AiChattingDto } from '../../../Models/AiChatting/AiDto';
import {marked, Marked} from 'marked';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.css',
})
export class Chatbot {

  messages = signal<AiChattingDto[]>([
    { message: "I am Your Personal Trainer Ask Any thing About Fitness", sender: "bot" }
  ]);

  userChat = '';
  isloading = signal<boolean>(false);

  // ChangeDetectorRef ki Signals mein zaroorat nahi hoti
  constructor(private service: AiService) {}


  FormatMessage(content:string):string{
    return marked.parse(content) as string
  }

  SendMessage() {
    if (!this.userChat.trim() || this.isloading()) return;

    const User = this.userChat;
    
    // User message add karo
    this.messages.update(msg => [...msg, { message: User, sender: "user" }]);
    this.userChat = '';
    
    // FIX 1: .set(true) use karo, dobara signal() mat banao
    this.isloading.set(true);

    this.service.Chatting(User).subscribe({
      next: (res: any) => {
        console.log(res);
        this.messages.update(msg => [...msg, { message: res.reply, sender: "bot" }]);
        
        // FIX 2: .set(false) use karo
        this.isloading.set(false);
      },
      error: (err: any) => {
        console.log(err);
        this.messages.update(msg => [...msg, { message: "Something went wrong, please try again.", sender: "bot" }]);
        
        // FIX 3: Error aane par bhi loading stop karo
        this.isloading.set(false);
      }
    });
  }
}