import { CommonModule } from '@angular/common';
import {
  Component,
  signal,
  WritableSignal,
  computed,
  untracked,
  effect,
  linkedSignal,
  resource,
  debounced,
  afterRenderEffect,
} from '@angular/core';
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
  protected readonly userId = signal(1);

  protected readonly userResource = resource<any, {id: number}>({
    params: () => ({id: this.userId()}),
    loader: async ({params}) => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`);
      if (!res.ok) {
        throw new Error(`Failed to load user (status: ${res.status})`);
      }
      return res.json();
    }
  });

  protected readonly userName = computed(() =>
    this.userResource.hasValue() ? this.userResource.value()!.name : undefined
  );

  // Debounced signals
  protected readonly numberToDDebounce = signal(0);
  protected readonly debouncedNumber = debounced(this.numberToDDebounce, 500);


  constructor() {
    effect(() => {
      console.log("Title changed to: " + this.title());
    });

    // Runs after the component has rendered and the DOM has been updated
    afterRenderEffect(()=>{
      console.log("Title changed to: " + this.title() + "after rendering");
    })
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
