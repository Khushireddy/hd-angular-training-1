import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import {AfterViewInit,  ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

export interface PeriodicElement {
  alpha_two_code: string;
  country: string;
  name: string;
  domains: string;
  webPages:string;
}


@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent  implements AfterViewInit {
  username:any;
  countries:any=[];
  universities:any;
  state:any;
  country:any;
  states:any=[{}];
  showSpinner = false;
  CounterValue=0

  displayedColumns: string[] = ['alpha_two_code', 'country', 'name', 'domains','web_pages'];
  dataSource :any;
  showOthers = false;
  
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined ;
  @ViewChild(MatSort) sort: MatSort | undefined;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private router: Router, private api:ApiService) {
    const str = localStorage.getItem('user');
    this.CounterValue=Number(localStorage.getItem('CounterValue'));
    console.log(str);
    if(str!=null) {
     const obj = JSON.parse(str);
     this.username = obj.name;
    }else{
      this.router.navigate (['/login'])
    }
   // this.callCountries();
    
  }

  logout(){
    localStorage.removeItem('user');
    localStorage.removeItem('CounterValue');
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
    this.showOthers = this.country == 'others'
    if(this.country == 'others')
    this.country = '';
    this.getAllStates();
  }
  getAllStates() {
    this.api.getstates(this.country).subscribe(res=>{
      this.showSpinner = false;
      if(res) {
      this.states = res;
      this.states = this.states.filter((v:any,i:any,a:any)=>a.findIndex(
        (v2:any)=>(v2['state-province']===v['state-province']))===i );
        this.CounterValue++;
        localStorage.setItem('CounterValue', this.CounterValue.toString());
      }
    })
  }
  onchangestate(){
    this.api.getuniversities(this.country,this.state).subscribe(res=>{
      console.log(res);
      this.dataSource = res;
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.CounterValue++;
      localStorage.setItem('CounterValue', this.CounterValue.toString());
    })
    
  }
  
}
