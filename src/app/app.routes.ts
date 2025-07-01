import { Routes } from '@angular/router';

import { AuthComponent } from './layouts/auth/auth.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';

import { authGuard } from './core/guards/auth.guard';
import { loginGuard } from './core/guards/login.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  // 🔐 Authentication Layout (login/register/forgot password)
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login.component').then(m => m.LoginComponent),
        title: 'Login',
        canActivate: [loginGuard]
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/register/register.component').then(m => m.RegisterComponent),
        title: 'Register',
        canActivate: [loginGuard]
      },
      {
        path: 'forgotpas',
        loadComponent: () =>
          import('./pages/forgotpas/forgotpas.component').then(m => m.ForgotpasComponent),
        title: 'Forgot Password',
        canActivate: [loginGuard]
      },
      {
        path: 'verify-code',
        loadComponent: () =>
          import('./pages/forgotpas/forgotpas.component').then(m => m.ForgotpasComponent),
        title: 'Verify Code',
        canActivate: [loginGuard]
      },
      {
        path: 'reset-password',
        loadComponent: () =>
          import('./pages/forgotpas/forgotpas.component').then(m => m.ForgotpasComponent),
        title: 'Reset Password',
        canActivate: [loginGuard]
      }
    ]
  },

  // 🏠 Main App Layout (Home and protected pages)
  {
    path: '',
    component: BlankComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },

      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.component').then(m => m.HomeComponent),
        title: 'Home',

      },
      {
        path: 'products',
        loadComponent: () =>
          import('./pages/products/products.component').then(m => m.ProductsComponent),
        title: 'Products',

      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./pages/cart/cart.component').then(m => m.CartComponent),
        title: 'Cart',
        canActivate: [authGuard]
      },
      {
        path: 'wishlist',
        loadComponent: () =>
          import('./pages/wishlist/wishlist.component').then(m => m.WishlistComponent),
        title: 'Wishlist',
        canActivate: [authGuard]
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./pages/brands/brands.component').then(m => m.BrandsComponent),
        title: 'Brands',

      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./pages/categories/categories.component').then(m => m.CategoriesComponent),
        title: 'Categories',

      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import('./pages/details/details.component').then(m => m.DetailsComponent),
        title: 'Product Details',

      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./pages/allorders/allorders.component').then(m => m.AllordersComponent),
        title: 'All Orders',

      },
      {
        path: 'checkout/:id',
        loadComponent: () =>
          import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent),
        title: 'Checkout',

      },

      // 404 Not Found
      {
        path: '**',
        component: NotfoundComponent,
        title: 'Not Found'
      }
    ]
  }
];
