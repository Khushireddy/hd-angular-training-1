import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
    
  }
    
  getcountries() {
    return this.http.get('http://universities.hipolabs.com/search?country=india');
  }

  getuniversities(state:any) {
    
    return this.http.get(`http://universities.hipolabs.com/search?country=india&name=${state}`);

  }

}
 
 



