import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, of, EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Card } from '../interfaces/card.interface';


@Injectable({
  providedIn: 'root'
})
export class CardService {

  API_URL = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

  constructor(
    private http: HttpClient
  ) { }

  getCards(name: string | null, offset: number): Observable<Card[] > {
    const params: any = {
      num: 100,
      offset,
      fname: name ?? undefined,
    };
  
    return this.http.get(`${this.API_URL}`, { params }).pipe(
      map((resp: any) => resp.data),
      catchError(() => EMPTY)
    );
  }

  getCardById(id: string): Observable<Card> {
    const params : any = {
      id: id
    };

    return this.http.get(`${this.API_URL}`, {params}).pipe(
      map((resp: any) => {console.log(resp.data[0]); return resp.data[0];}));

    }

}
