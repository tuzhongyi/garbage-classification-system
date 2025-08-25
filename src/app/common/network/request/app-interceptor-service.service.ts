import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AppInterceptorServiceService implements HttpInterceptor {
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      .pipe(catchError((err: HttpErrorResponse) => this.handleData(err)));
  }

  private handleData(
    event: HttpResponse<any> | HttpErrorResponse
  ): Observable<any> {
    // switch (event.status) {
    //   case 500:
    //     MessageBar.response_Error('操作失败');
    //     break;
    //   case 503:
    //     MessageBar.response_Error('操作失败');
    //     break;
    //   case 400:
    //     MessageBar.response_Error('操作失败');
    //     break;
    //   case 504:
    //     MessageBar.response_Error('操作失败');
    //     break;
    //   default:
    // }

    return throwError(event);
  }
}
