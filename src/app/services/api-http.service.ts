import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs';
import { IListing } from '../listings/listing';

@Injectable({
  providedIn: 'root'
})
export class ApiHttpService {
  private muralUrl = 'https://data.cityofchicago.org/resource/we8h-apcf.json'
  constructor(private http: HttpClient) { }

  getMurals(): Observable<IListing[]> {
    return this.http.get<IListing[]>(this.muralUrl).pipe(
      tap(data=>console.log('All:', JSON.stringify(data))),
      catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`
    } else {
      errorMessage = `A server error occurred: ${err.error.message}`
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
