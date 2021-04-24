import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/core/models/login-req.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public authForm: FormGroup;
  public errorMessage: string = '';
  public isLoading: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private dialog: MatDialog) {
    this.authForm = fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  public loginUser(): void {
    const userForAuth: LoginRequest = {
      userName: this.authForm.controls.login.value,
      password: this.authForm.controls.password.value
    };
    this.isLoading = true;
    this.authService.loginUser('auth/login', userForAuth).subscribe(
      res => {
        this.isLoading = false;
        localStorage.setItem('accessToken', res.tokens.accessToken);
        localStorage.setItem('refreshToken', res.tokens.refreshToken);
        this.authService.sendAuthStateChangeNotification(res.isAuthSuccessful);
        this.router.navigate(['']);
      },
      error => {
        this.isLoading = false;
        this.dialog.open(ErrorDialogComponent);
        this.errorMessage = error.error.errorMessage;
      }
    );
  }

  public onRedirect(): void {
    this.router.navigate(['auth', 'register']);
  }
}
