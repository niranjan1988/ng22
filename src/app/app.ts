import { Component, signal, WritableSignal, computed,untracked, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title: WritableSignal<string> = signal('ng22', {
    equal: (a, b) => a.toLowerCase() === b.toLowerCase()
  });
  protected readonly description: WritableSignal<string> = signal('description');
  protected readonly subtitle = computed(()=> "Learn " + this.title());
  protected readonly titleText = computed(()=> this.title() + " - " + this.subtitle() + " - " + this.description());
  protected readonly untrackedDescription = computed(()=> this.title() + " - " + this.subtitle() + " - " + untracked(this.description));


  protected readonly pageItems=['Home','About','Contact','Services','Products','Blog','Careers','Support','FAQ','Testimonials'];

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
