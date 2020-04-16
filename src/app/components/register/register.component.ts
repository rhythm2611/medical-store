import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errors : any = [];

  constructor(private authService : AuthService, private alertService : AlertService, private router: Router) { 
    
  }

  ngOnInit() {

    
  }

  register(formData : NgForm) : void{
    this.errors = [];
    this.authService.registerUser(formData.value).subscribe(
      response => {
        formData.reset();
        this.alertService.alert('success', response.msg, true);
        this.router.navigate(['/login'])
      },
      (err) => {
        if(err.status == 422){
          this.errors = err.error.data
        }
      }
    )
    
    
  }

}
