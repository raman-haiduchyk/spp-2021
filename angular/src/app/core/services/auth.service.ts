import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../models/auth-res.model';
import { LoginRequest } from '../models/login-req.model';
import { RegistrationRequest } from '../models/register-req.model';
import { RegistrationResponse } from '../models/register-res.model';
import { Tokens } from '../models/tokens.model';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = environment.urlAddress;

  private authChangeSub: Subject<boolean> = new Subject<boolean>();
  public authChanged: Observable<boolean> = this.authChangeSub.asObservable();

  public isRefreshTokenInProgress: boolean = false;

  public tokenRefreshedSub: Subject<boolean> = new Subject();
  public tokenRefreshed$: Observable<boolean> = this.tokenRefreshedSub.asObservable();

  constructor(
    private http: HttpClient, private jwtHelper: JwtHelperService, private router: Router
    ) { }

  private createCompleteRoute(route: string, envAddress: string): string {
    return `${envAddress}/${route}`;
  }

  public registerUser(route: string, body: RegistrationRequest): Observable<RegistrationResponse> {
    return this.http.put<RegistrationResponse>(this.createCompleteRoute(route, this.url), body);
  }

  public loginUser(route: string, body: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.createCompleteRoute(route, this.url), body);
  }

  public refreshToken(route: string): Observable<boolean> {

    const accessToken: string = localStorage.getItem('accessToken');
    const refreshToken: string = localStorage.getItem('refreshToken');
    const tokens: Tokens = {accessToken: accessToken, refreshToken: refreshToken };

    if (!this.isRefreshTokenInProgress) {
      this.isRefreshTokenInProgress = true;
      return this.http.post<Tokens>(this.createCompleteRoute(route, this.url), tokens).pipe(
        switchMap((res) => {
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('refreshToken', res.refreshToken);
          this.sendAuthStateChangeNotification(true);
          this.tokenRefreshedSub.next(true);
          this.isRefreshTokenInProgress = false;
          return of(true);
        }),
        catchError((error) => {
          this.sendAuthStateChangeNotification(false);
          this.logout();
          this.router.navigate(['auth/login'], { queryParams: { returnUrl: this.router.url } });
          this.tokenRefreshedSub.next(false);
          this.isRefreshTokenInProgress = false;
          return of(false);
        })
      );
    } else {
      return this.tokenRefreshed$;
    }
  }

  public logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.sendAuthStateChangeNotification(false);
  }

  public sendAuthStateChangeNotification(isAuthenticated: boolean): void {
    this.authChangeSub.next(isAuthenticated);
  }

  public isUserPotentialAuthenticated(): boolean {
    const accessToken: string = localStorage.getItem('accessToken');
    const refreshToken: string = localStorage.getItem('refreshToken');
    return (accessToken && refreshToken && true);
  }

  public isUserAuthenticated(): boolean {
    const token: string = localStorage.getItem('accessToken');
    return (token && !this.jwtHelper.isTokenExpired(token));
  }

  public isBelongToUser(name: string): boolean {
    const token: string = localStorage.getItem('accessToken');
    if (!token) { return false; }
    const decodedToken: string = this.jwtHelper.decodeToken(token);
    // tslint:disable-next-line: no-string-literal
    const userName: string = decodedToken['name'];
    return userName === name;
  }

  public getUserName(): string {
    const token: string = localStorage.getItem('accessToken');
    if (!token) { return null; }
    const decodedToken: string = this.jwtHelper.decodeToken(token);
    // tslint:disable-next-line: no-string-literal
    const userName: string = decodedToken['name'];
    return userName;
  }
}
