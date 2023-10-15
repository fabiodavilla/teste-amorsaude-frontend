import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class PagesService {
  constructor(private http: HttpClient) {}

  public getEntidade(id: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/entidade/${id}`);
  }

  public getList(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/entidade`);
  }

  public getRegionalList(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/entidade/regionais`);
  }

  public getEspecialidadeList(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/entidade/especialidades`);
  }

  public create(body: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/entidade`, body);
  }

  public update(id: string, body: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/entidade/${id}`, body);
  }

  public delete(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/entidade/${id}`);
  }
}
