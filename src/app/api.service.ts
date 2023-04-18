import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
    
  }
  
  getcountries() {
    return this.http.get('http://universities.hipolabs.com/search');
  }

  getstates(country:any) {
    return this.http.get(`http://universities.hipolabs.com/search?country=${country}`);
  }

  getuniversities(country:any, state:any) {
    return this.http.get(`http://universities.hipolabs.com/search?country=${country}&name=${state}`);
  }

}
 
 



