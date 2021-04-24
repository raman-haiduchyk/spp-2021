import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { debounceTime, delay, filter, map, mergeMap, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Chapter } from '../models/chapter.model';
import { UserComment } from '../models/comment.model';
import { CreateResponse } from '../models/create-request';
import { Funfic } from '../models/funfic.model';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private url: string = environment.urlAddress;

  constructor(private http: HttpClient) { }

  private createCompleteRoute(route: string, envAddress: string): string {
    return `${envAddress}/${route}`;
  }

  public createFunficResponse(route: string, name: string): Observable<CreateResponse> {
    return this.http.put<CreateResponse>(this.createCompleteRoute(route, this.url), {name: name});
  }

  public getFunficResponse(route: string): Observable<Funfic[]> {
    return this.http.get<Funfic[]>(this.createCompleteRoute(route, this.url));
  }

  public getFunficByIdResponse(route: string, id: number): Observable<Funfic> {
    return this.http.get<Funfic>(this.createCompleteRoute(route, this.url) + `/${id}`);
  }

  // tslint:disable: no-any
  public changeFunfic(route: string, body: Funfic): Observable<any> {
    return this.http.post<any>(this.createCompleteRoute(route, this.url) + `/${body.id}`, body);
  }

  public deleteFunfic(route: string, id: number): Observable<any> {
    return this.http.delete<any>(this.createCompleteRoute(route, this.url) + `/${id}`);
  }

  public getCommentsResponse(route: string, funficId: number): Observable<UserComment[]> {
    return this.http.get<UserComment[]>(this.createCompleteRoute(route, this.url) + `/${funficId}`);
  }

  public createCommentResponse(route: string, funficId: number, text: string): Observable<UserComment> {
    return this.http.put<UserComment>(this.createCompleteRoute(route, this.url) + `/${funficId}`, {text: text});
  }

  public setRatingResponse(route: string, funficId: number, stars: number): Observable<{rating: number}> {
    return this.http.post<{rating: number}>(this.createCompleteRoute(route, this.url) + `/${funficId}`, {stars: stars});
  }

  public getRatingResponse(route: string, funficId: number): Observable<{rating: number}> {
    return this.http.get<{rating: number}>(this.createCompleteRoute(route, this.url) + `/${funficId}`);
  }

}
