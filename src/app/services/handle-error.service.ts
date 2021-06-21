import { ErrorHandler, Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})

export class HandleError implements ErrorHandler {  
  constructor() {   
  }  
  handleError(error: any) : void {  
    //add some error handling logic
    console.error('OY! An error occurred:', error);  
 }  
}  