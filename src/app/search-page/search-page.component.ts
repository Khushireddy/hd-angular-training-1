import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent {
  username:any;
  countries:any;
  universities:any;
  state:any;

  constructor(private router: Router, private api:ApiService) {
    const str = localStorage.getItem('user');
    console.log(str);
    if(str!=null) {
     const obj = JSON.parse(str);
     this.username = obj.name;
    }else{
      this.router.navigate (['/login'])
    }
    this.api.getcountries().subscribe(res=>{
      console.log(res);
      this.countries = res;
    })
    
  }

  logout(){
    localStorage.removeItem('user');
    this.router.navigate (['/login'])
  }
  onchangecountry(){
    
    this.api.getuniversities(this.state).subscribe(res=>{
      console.log(res);
      this.universities = res;
    })
    
  }
}
