import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ReadMapJSONService {
  private url="./assets/world.topo.json";
  constructor(private _httpClient:HttpClient) { }
  getJSONData():Observable<any>
  {
    return this._httpClient.get<any>(this.url);
    
  }
 
  
}
