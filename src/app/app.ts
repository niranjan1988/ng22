import { CommonModule } from '@angular/common';
import { Component, signal, WritableSignal, computed, untracked, effect, linkedSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title: WritableSignal<string> = signal('ng22', {
    equal: (oldValue, newValue) => oldValue.toLowerCase() === newValue.toLowerCase()
  });
  protected readonly description: WritableSignal<string> = signal('description');
  protected readonly subtitle = computed(() => "Learn " + this.title());
  protected readonly titleText = computed(() => this.title() + " - " + this.subtitle() + " - " + this.description());
  protected readonly untrackedDescription = computed(() => this.title() + " - " + this.subtitle() + " - " + untracked(this.description));


  // Linked signal
  protected readonly pageItems = signal(['Home', 'About', 'Contact', 'Services', 'Products']);
  //protected readonly selectedPage = linkedSignal(() => this.pageItems()[0]);
  protected readonly selectedPage = linkedSignal({
    source: this.pageItems,
    computation: (newitems, selected) => newitems.find(item => item === selected?.value) || newitems[0]
  });

  // Resource
  

  constructor() {
    effect(() => {
      console.log("Title changed to: " + this.title());
    });
  }

  setTitle(newTitle: string) {
    this.title.set(newTitle);
  }

  setDescription(newDescription: string) {
    this.description.set(newDescription);
  }

  updateTitle() {
    this.title.update((t) => "New " + t);
  }

}
