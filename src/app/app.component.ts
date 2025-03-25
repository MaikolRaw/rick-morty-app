import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebsocketService } from './services/websocket.service';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  errorMessage: string = '';
  tittle = 'Rick and Morty';

  constructor(private wsService: WebsocketService) {}

  ngOnInit(): void {
    this.wsService.connectionError$.subscribe((error: string) => {
      this.errorMessage = error;
    });
    this.wsService.connect();
  }
}

