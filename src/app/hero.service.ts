import { Injectable } from '@angular/core';
import { Hero } from "./hero";
// import { HEROES } from "./mock-heroes";
import { Observable, of } from "rxjs";
import { MessageService } from "./message.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class HeroService {
  private heroesUrl = 'api/heroes';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
  
  // getHero(id: number): Observable<Hero> {
  //   // todo: send the message after fetching the hero
  //   this.messageService.add(`HeroService: fetched hero id=${id}`);
  //   return of(HEROES.find(hero => hero.id === id))
  // };

  getHeroes(): Observable<Hero[]> {
    // TODO: send the message after fetching the heroes
    // this.messageService.add('HeroService: fetched heroes')
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(heroes => this.log('fetched heroes')),
        catchError(this.handleError('getHeroes', []))
      )
  }

  private handleError<T>(operation = 'operation', result?:T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`)

      return of(result as T)
    }
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`)
  }
}

