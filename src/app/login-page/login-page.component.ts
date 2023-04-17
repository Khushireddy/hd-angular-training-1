import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  username:any;
  userObject:any;
  constructor(private router: Router) {
    const str = localStorage.getItem('user');
    console.log(str);
    if(str!=null) {
     this.userObject = JSON.parse(str);
    
    }

  }

  continue(){
    const obj ={name:this.username};
    localStorage.setItem('user', JSON.stringify(obj));
    console.log(obj);
    this.router.navigate (['/search'])

  }
  reset(){
    this.username = '';
   
  }

}
