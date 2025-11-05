import { Component, Inject, OnInit, Optional, PLATFORM_ID, REQUEST } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'test-app';

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Optional() @Inject(REQUEST) private request: any
  ) {
    console.log(this.request?.url ?? 'URL');
  }

  ngOnInit() {
    // Выполняется только на клиенте
    if (isPlatformBrowser(this.platformId)) {
      console.log('✅ Hydration completed at:', new Date().toISOString());
    }
  }
}
