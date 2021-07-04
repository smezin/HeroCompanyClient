import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../entities/user.model';
import { HandleError } from './handle-error.service';

interface AuthResponseData {
  id: string;
  name: string,
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);  
  getUserStatus = this.user.asObservable();
  
  constructor(
    private http: HttpClient, 
    private handleErrorService: HandleError) { }

  private heroTrainrUrl = environment.heroTrainerUrl;

  signup (name: string, password: string, rememberMe: boolean = true) : Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(`${this.heroTrainrUrl}/signup`, {
      name: name,
      password: password
    }).pipe(
      tap(resData => {
        this.handleAuthentication(          
          resData.name, 
          resData.id, 
          resData.token,
          rememberMe
        );
      })
    )    
  }
  login (name: string, password: string, rememberMe: boolean = true) : Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(`${this.heroTrainrUrl}/login`, {
      name: name,
      Password: password
    }).pipe(      
      tap(resData => {
        this.handleAuthentication(
          resData.name, 
          resData.id,           
          resData.token,
          rememberMe
        );
      })
    )    
  }
  logout () {
    localStorage.removeItem('user');
    this.user.next(null);
  }
  private handleAuthentication (name: string, id:string, token:string, rememberMe: boolean)  {
    const user = new User(
      id,
      name,
      token
    );
    if (rememberMe) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
    
    this.user.next(user);
  }
}
