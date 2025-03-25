import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Interceptor que centraliza el manejo de errores HTTP.
 * Muestra un snackbar con el mensaje de error.
 */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = 'Ocurrió un error en la petición.';
        if (error.error instanceof ErrorEvent) {
          // Error del lado del cliente (ej. desconexión de red)
          errorMsg = `Error: ${error.error.message}`;
        } else {
          // Error del lado del servidor
          errorMsg = `Error Código: ${error.status}, Mensaje: ${error.message}`;
        }
        // Muestra el error en un snackbar
        this.snackBar.open(errorMsg, 'Cerrar', { duration: 3000 });
        return throwError(() => error);
      })
    );
  }
}
