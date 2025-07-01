import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loodingInterceptor: HttpInterceptorFn = (req, next) => {
  const ngxSpinnerService = inject(NgxSpinnerService)

  ngxSpinnerService.show('loader2')

  return next(req).pipe(finalize(()=>{
    ngxSpinnerService.hide('loader2')
  }))
};
