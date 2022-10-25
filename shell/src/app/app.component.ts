// @ts-ignore skip type check
import { loadRemoteModule } from '../helper';
// import { loadRemoteModule } from '@angular-architects/module-federation';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('b1', { read: ElementRef, static: true })
  b1: ElementRef | undefined;
  @ViewChild('b2', { read: ElementRef, static: true })
  b2: ElementRef | undefined;
  @ViewChild('b3', { read: ElementRef, static: true })
  b3: ElementRef | undefined;

  constructor(private elementRef: ElementRef) {}

  async ngAfterViewInit() {
    try {
      await loadRemoteModule({
        type: 'script',
        remoteEntry: 'http://localhost:4500/remoteEntry.js',
        remoteName: 'thirdButton',
        exposedModule: './third-button',
      });
      await loadRemoteModule({
        type: 'script',
        remoteEntry: 'http://localhost:4400/remoteEntry.js',
        remoteName: 'secondButton',
        exposedModule: './second-button',
      });
      await loadRemoteModule({
        type: 'script',
        remoteEntry: 'http://localhost:4300/remoteEntry.js',
        remoteName: 'firstButton',
        exposedModule: './first-button',
      });
      const el1 = document.createElement('first-button');
      const el2 = document.createElement('second-button');
      const el3 = document.createElement('third-button');
      this.b3?.nativeElement.appendChild(el3);
      this.b2?.nativeElement.appendChild(el2);
      this.b1?.nativeElement.appendChild(el1);
    } catch (ex) {
      console.error('An error occured', ex);
    }
  }
  title = 'shell';
}
