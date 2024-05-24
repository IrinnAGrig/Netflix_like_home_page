declare var google: any;
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);
  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '',
      callback: (resp: any) => this.handleLogin(resp)
    });

    google.accounts.id.renderButton(document.getElementById("google-btn"), {
      theme: 'filled_blue',
      size: 'medium',
      shape: 'rectangle',
      width: 300
    })
  }
  private decodeToken(token: string) {
    if (token)
      return JSON.parse(atob(token!.split(".")[1]));
  }

  handleLogin(response: any) {
    if (response) {
      const payload = this.decodeToken(response.credential);
      sessionStorage.setItem("loggedInUser", JSON.stringify(payload));
      this.authService.autoLogin();
      this.router.navigate(['/browse']);
    }
  }
}
