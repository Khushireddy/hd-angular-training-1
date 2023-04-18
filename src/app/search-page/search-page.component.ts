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
  countries:any=[{}];
  universities:any;
  state:any;
  country:any;
  states:any=[{}];
  showSpinner = false;

  constructor(private router: Router, private api:ApiService) {
    const str = localStorage.getItem('user');
    console.log(str);
    if(str!=null) {
     const obj = JSON.parse(str);
     this.username = obj.name;
    }else{
      this.router.navigate (['/login'])
    }
    this.callCountries();
    
  }

  logout(){
    localStorage.removeItem('user');
    this.router.navigate (['/login'])
  }
  callCountries(){
    this.showSpinner = true;
    this.api.getcountries().subscribe((res)=>{
      console.log(res);
      this.showSpinner = false;
      if(res){
        this.countries = res;
        if(this.countries && this.countries.length >0 ){
          this.countries = this.countries.filter((v:any,i:any,a:any)=>a.findIndex((v2:any)=>(v2.country===v.country))===i)
        }
      }
    })
    
  }
  onchangecountry(){
    this.showSpinner = true;
    this.api.getstates(this.country).subscribe(res=>{
      console.log(res);
      this.showSpinner = false;
      if(res) {
      this.states = res;
      this.states = this.states.filter((v:any,i:any,a:any)=>a.findIndex(
        (v2:any)=>(v2['state-province']===v['state-province']))===i);
      }
    })
    
  }
  onchangestate(){
    this.api.getuniversities(this.country,this.state).subscribe(res=>{
      console.log(res);
      this.universities = res;
    })
    
  }
}
