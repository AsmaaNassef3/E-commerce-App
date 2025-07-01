import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = () => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    if (localStorage.getItem('userToken') !== null) {
      router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};
