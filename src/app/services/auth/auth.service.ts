import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedValue: boolean = false;

  constructor(
    
  ) { }

  login(correo: string, password: string): boolean {
    return this.isAuthenticatedValue;
  }

  logout(): void {
    this.isAuthenticatedValue = false;
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedValue;
  }

}
