import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errors : any = [];

  constructor(private authService : AuthService, private alertService : AlertService, private router: Router) { }

  ngOnInit() {
  }

  login(formData : NgForm) : void{
    this.errors = [];
    this.authService.loginUser(formData.value).subscribe(
      response => {
        formData.reset();
        this.alertService.alert('success', response.msg, true);
        this.router.navigate(['/profile'])
      },
      (err) => {
        if(err.status == 422){
          this.errors = err.error.data
        }
      }
    )
    
    
  }

}
