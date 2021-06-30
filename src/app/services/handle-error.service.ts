import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { ErrorHandler, Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})

export class HandleError implements ErrorHandler, HttpInterceptor {  
  constructor() {   }  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
     .pipe(
       retry(1),
       catchError((error: HttpErrorResponse) => {
         let errorMessage = '';
         if (error.error instanceof ErrorEvent) {
           // client-side error
           errorMessage = `Client Error: ${error.error.message}`;
         } else {
           // server-side error
           errorMessage = `Http Error Code: ${error.status}\n Message: ${error.error}`;
         }
         console.error(errorMessage);
         return throwError(error);
       })
     )
  }
  handleError(error: any) : void {  
    //add some error handling logic
    console.error('Full description from global error handler:', error);  
    return;
 }  
}  