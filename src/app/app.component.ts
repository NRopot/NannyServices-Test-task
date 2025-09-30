import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [AuthService],
})
export class AppComponent {
  title = 'test-app';
}
