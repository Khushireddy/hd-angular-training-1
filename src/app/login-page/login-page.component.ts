import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  username:string = '';
  userObject:Object = {};
  constructor(private router: Router) {

    const str = localStorage.getItem('user');
    
    if(str!=null) {
    this.userObject = JSON.parse(str);
    
    }

  }

  continue(){
    if(!this.username){
      alert("please provide the username to continue.")
      return;
    }

    if(this.username && this.username.length > 0) {
    const obj ={name:this.username};

    localStorage.setItem('user', JSON.stringify(obj));
    
    this.router.navigate (['/search'])
    }
  }
  reset(){
    this.username = '';
   
  }

}
