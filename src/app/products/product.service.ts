import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from "@angular/core"
import { Observable, catchError, tap, throwError } from 'rxjs';
import { IProduct } from "./product";

@Injectable({
    providedIn: 'root'
})

export class ProductService {
    
    private productUrl = 'api/products/products.json';

    constructor(private http: HttpClient) {

    }
    
    // Return type is an Obervable
    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl).pipe(
            tap(data => console.log('All', JSON.stringify(data))),
            catchError(this.handleError)
        ); // Automatically maps returned data to array of products
    }

    private handleError(err: HttpErrorResponse) {
        // In real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console. 

        let errorMessage = ''
        if (err.error instanceof ErrorEvent){
            // Client-side or network error occurred. Handle accordingly. 
            errorMessage = `An error occured: ${err.error.message}`;
        } else {
            // Backend returned an unsuccessful response code
            // The response body may contain clues as to what went wrong
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`
        }
        console.error(errorMessage)
        return throwError(()=>errorMessage)
    }
}