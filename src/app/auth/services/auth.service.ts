import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthResponse, Usuario } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _usuario!: Usuario;

  get usuario() {
    return { ...this._usuario };//Protegue el valor es opcional usarlo, podria ser return this._usuario; simplemente
  }

  constructor(private http: HttpClient) { }

  registro (username:string, email:string, password: string){
    const url = `${this.baseUrl}/auth/new`;
    const body = {username,email,password};

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(({ok,token}) => {

          if (ok) {
            localStorage.setItem('token',token!);
          }

        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      )
  }

  login(email: string, password: string) {

    const url = `${this.baseUrl}/auth`;
    const body = { email, password }

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {

          if (resp.ok) {
            localStorage.setItem('token',resp.token!);
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      )

  }


  validarToken():Observable<boolean>{

    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token',localStorage.getItem('token') || '');//Debido a que puede ser nulo se usa el operador || para enviar un vación

    return this.http.get<AuthResponse>(url,{headers})
      .pipe(
        map( resp => {

          this._usuario={
            uid: resp.uid!,
            username:resp.username!,
            email:resp.email!
          }

          return resp.ok
        }),
          catchError(err => of(false))
      );

  }

  salir(){
    localStorage.removeItem('token');
  }
}
