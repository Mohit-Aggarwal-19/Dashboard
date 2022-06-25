import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IRootObject } from '../Interfaces/rootObject';
@Injectable({
  providedIn: 'root'
})
export class FetchDataFromApiService {
  
  private url:string="https://coronavirus.m.pipedream.net/";
  constructor(private _httpClientService:HttpClient) { }

  getData():Observable<IRootObject[]>
  {
    return this._httpClientService.get<IRootObject[]>(this.url)
  }

}
