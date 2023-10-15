import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { catchError, finalize, tap, throwError } from 'rxjs';
import { Store } from '@ngxs/store';
import { SetJwtToken } from 'src/app/states/auth.state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  passwordVisible = false;
  formSubmitted = false;
  invalidCredentials = false;
  errorMessage = '';
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
    });
  }

  onSubmit() {
    this.isLoading = true;
    this.formSubmitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.authService
      .login(this.loginForm.value)
      .pipe(
        tap((data) => {
          this.store.dispatch(new SetJwtToken(data.access_token));

          this.router.navigate(['/']);
        }),
        catchError((error) => {
          if (error.status === 400) {
            this.invalidCredentials = true;
            this.errorMessage = 'Invalid Credentials';
          }

          return throwError(error);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe();
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
