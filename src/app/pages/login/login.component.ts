import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/servies/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/servies/cart/cart.service';
import { WishlistService } from '../../core/servies/wishlist/wishlist.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isLooding: boolean = false;
  msgError: string = '';
  msgSuccess: string = '';

  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);

  LoginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(50)]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,20}$/)
    ])
  });

  submitForm(): void {
    if (this.LoginForm.valid) {
      this.isLooding = true;
      this.authService.sendLoginForm(this.LoginForm.value).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            localStorage.setItem('userToken', res.token);
            this.authService.saveUserToken();
            console.log('Login successful:', res);

            // تحديث عدادات السلة والمفضلة
            this.cartService.getLoggedUserCart().subscribe(cartRes => {
              this.cartService.cartNum.set(cartRes.numOfCartItems);
            });

            this.wishlistService.getLogedUserWishList().subscribe(wishRes => {
              this.wishlistService.wishlistCount.set(wishRes.data.length);
            });

            this.router.navigate(['/home']);
            this.msgSuccess = 'Login successful';
          }
          this.isLooding = false;
        },
        error: (err) => {
          this.isLooding = false;
          this.msgError = err.error?.message || 'Login failed. Please try again.';
        }
      });
    } else {
      this.LoginForm.markAllAsTouched();
    }
  }
}
