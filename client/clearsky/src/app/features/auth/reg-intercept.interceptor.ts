import { HttpInterceptorFn } from '@angular/common/http';

export const regInterceptInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
