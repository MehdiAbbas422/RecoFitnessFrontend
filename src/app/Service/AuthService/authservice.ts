import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Authservice {

  private apiUrl = 'http://RecoFit.somee.com/api/Auth';

  constructor(private http: HttpClient) {}

  Register(RegisterInfo: any) {
    return this.http.post(`${this.apiUrl}/register`, RegisterInfo);
  }
  RegisterOtp(Email: any, OTP: any) {
    return this.http.post(`${this.apiUrl}/registerotp?email=${Email}&otp=${OTP}`, {});
  }

  Login(LoginInfo: any) {
    return this.http.post(`${this.apiUrl}/login`, LoginInfo);
  }

SaveToken(Token: any) {
  // 1. Safe check: Agar token mila hi nahi, to yahin se wapas ho jao
  // if (!Token) {
  //   console.error("Token nahi mila ya khali hai!");
  //   return;
  // }

  // // 2. Safe check: Agar token string nahi hai (jaise poora object aa gaya ho), to use string me badlo
  // const tokenStr = typeof Token === 'string' ? Token : Token.token || Token.accessToken;

  // if (tokenStr && typeof tokenStr === 'string') {
  //   // Aapka lagaya hua badhiya logic:
  //   const pureToken = tokenStr.startsWith('Bearer ')
  //     ? tokenStr.split(' ')[1] // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  //     : tokenStr;

    localStorage.setItem('token', Token);
  // } else {
  //   console.error("Token ka format sahi nahi hai:", Token);
  // }
}

  GetToken(): string | null {
    return localStorage.getItem('token');
  }

  GetRole(): string | null {
    const token = this.GetToken();
    if (token) {
      
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.Role || null;
      
      

    }
    return null;
  }
  GetName(): string | null {
    const token = this.GetToken();
    if (token) {
      
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.Name || 'Hussa';
      
      

    }
    return null;
  }

  GetId(): string | null {
    const token = this.GetToken();
    if (token) {
      
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.Id || null;

    }
    return null;
  }

  Logout() {
    localStorage.removeItem('token');
  }


  ProfilePasswordChange(PasswordInfo: string) {
    return this.http.post(`${this.apiUrl}/reset-password-profile?Password=${PasswordInfo}`, {});
  }


  
}
