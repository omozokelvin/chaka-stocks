import { Subject } from 'rxjs';

export class AsyncInitializedComponent {
  loadedState: Subject<boolean> = new Subject<boolean>();
  loadedState$ = this.loadedState.asObservable();
  constructor() {
  }
  protected componentLoaded() {
    this.loadedState.next(true);
  }
}