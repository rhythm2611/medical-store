import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AlertService } from 'src/app/shared/services/alert.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private alertService : AlertService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    
    if(this.authService.isLoggedIn()){
      return true
    }else{
      this.alertService.alert('danger', 'Not Authorized', true);
      this.router.navigate(['/login'])
      return !this.authService.isLoggedIn()
    } 

  }
}
