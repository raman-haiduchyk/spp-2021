import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegistrationRequest } from 'src/app/core/models/register-req.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public registerForm: FormGroup;

  public errorMessages: string[];

  public isLoading: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private dialog: MatDialog) {
    this.registerForm = fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
   }

  public registerUser(): void {
    const user: RegistrationRequest = {
      userName: this.registerForm.controls.name.value,
      email: this.registerForm.controls.email.value,
      password: this.registerForm.controls.password.value,
    };
    this.isLoading = true;
    this.authService.registerUser('auth/register', user)
    .subscribe(
      res => {
        this.isLoading = false;
        console.log('Successful registration');
        this.router.navigate(['']);
      },
      error => {
        this.isLoading = false;
        error.error.errors.ConfirmPassword
          ? this.errorMessages = [...error.error.errors.ConfirmPassword]
          : this.errorMessages = [...error.error.errors];
        this.dialog.open(ErrorDialogComponent);
      }
    );
  }

  public onRedirect(): void {
    this.router.navigate(['auth', 'login']);
  }
}
