import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  envMode : string = environment.production ? 'prod' : 'dev'
  constructor(public authService : AuthService, private alertService : AlertService, private router: Router) { }

  ngOnInit() {
  }

  logout(){
    this.authService.logoutUser().subscribe(
      () => {
        this.alertService.alert('success', 'Logged out successfully', true);
        this.router.navigate(['/login'])
      }
    )
  }
}
