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
  
  constructor(private http: HttpClient, private handleErrorService: HandleError) { }
  private heroTrainrUrl = environment.heroTrainerUrl;

  signup (name: string, password: string) {
    return this.http.post<AuthResponseData>(this.heroTrainrUrl, {
      name: name,
      password: password
    }).pipe(
      tap(resData => {
        this.handleAuthentication(          
          resData.name, 
          resData.id, 
          resData.token
        );
      })
    )    
  }

  login (name: string, password: string) : Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(`${this.heroTrainrUrl}/login`, {
      name: name,
      Password: password
    }).pipe(      
      tap(resData => {
        this.handleAuthentication(
          resData.name, 
          resData.id,           
          resData.token
        );
      })
    )    
  }
  getToken():string {
    return this.user.value ? this.user.value.token : '';
  }
  private handleAuthentication (name: string, id:string, token:string)  {
    const user = new User(
      id,
      name,
      token
    );
    this.user.next(user);
  }
}
