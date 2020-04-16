import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userDetails : any
  constructor(private authService : AuthService) { }

  ngOnInit() {
    this.authService.getUserDetails().subscribe(
      response => {
        this.userDetails = response
      }
    )
  }

  throwError(){
    throw new Error('My Pretty Error');
  }
  

}
