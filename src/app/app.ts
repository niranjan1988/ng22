import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  topics = signal(['Signal', 'Components']);

  constructor(private router: Router) {}

  selectTopic(topic: string) {
    void this.router.navigate(['/' + topic.toLowerCase()]);
  }
}
