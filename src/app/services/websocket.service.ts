import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Subject, interval, Subscription } from 'rxjs';
import { environment } from '../../environments/environment';

export interface WSMessage {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket$!: WebSocketSubject<WSMessage>;
  public connectionError$: Subject<string> = new Subject<string>();
  private simulationSubscription!: Subscription;

  /**
   * Conecta al WebSocket. Si 'simulateWebSocket' está activo en environment,
   * se simulan mensajes cada 5 segundos en vez de conectarse a un servidor real.
   */
  connect(): void {
    if (environment.simulateWebSocket) {
      console.warn('Simulación de WebSocket activa');
      // Emite un mensaje simulado cada 5 segundos
      this.simulationSubscription = interval(5000).subscribe(() => {
        const simulatedMessage: WSMessage = { message: 'Mensaje simulado del back' };
        this.handleMessage(simulatedMessage);
      });
    } else {
      // Conexión real al WebSocket
      this.socket$ = webSocket<WSMessage>(environment.websocketUrl);
      this.socket$.subscribe({
        next: (msg: WSMessage) => this.handleMessage(msg),
        error: (err: any) => {
          console.error('WebSocket error', err);
          this.connectionError$.next('Actualmente no hay conexión al back.');
        },
        complete: () => console.warn('WebSocket completado')
      });
    }
  }

  /**
   * Maneja cada mensaje entrante (simulado o real).
   * Envía confirmación de recepción.
   */
  private handleMessage(msg: WSMessage): void {
    console.log('Mensaje recibido:', msg);
    this.sendConfirmation(msg);
  }

  /**
   * Envía una confirmación del mensaje recibido.
   * Si es modo simulado, solo hace console.log.
   * Si es modo real, envía al socket.
   */
  sendConfirmation(msg: WSMessage): void {
    const confirmation: WSMessage = { message: `Confirmado: ${msg.message}` };
    if (environment.simulateWebSocket) {
      console.log('Simulación: envío de confirmación:', confirmation);
    } else {
      this.socket$.next(confirmation);
    }
  }

  /**
   * Desconecta el socket. Si es simulado, se desuscribe del interval.
   */
  disconnect(): void {
    if (environment.simulateWebSocket) {
      if (this.simulationSubscription) {
        this.simulationSubscription.unsubscribe();
      }
    } else if (this.socket$) {
      this.socket$.complete();
    }
  }
}
