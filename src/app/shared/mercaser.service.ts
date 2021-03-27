import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MercaserService {

  public API = 'https://api.mercadolibre.com';

  constructor(private http: HttpClient) { }

  getAll(item: any, offset: number, limit: number): Observable<any> {
    console.log(this.API + '/sites/MCO/search?q=' + item);
    return this.http.get(this.API + '/sites/MCO/search?q=' + item);
  }
  
  getSeller(id: any): Observable<any> {
    return this.http.get(this.API + '/users/' + id);
  }

}
