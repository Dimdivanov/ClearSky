import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environments.development';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const API = environment.loginUrl; 
  const apiPath = '/auth';

  if (req.url.startsWith(apiPath)) {
    console.log('intercepted a request: ', req.url);

    req = req.clone({
      url: req.url.replace(apiPath, API),
    });
  }

  return next(req);
};
