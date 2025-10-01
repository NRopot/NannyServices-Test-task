import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-not-found-page',
  templateUrl: 'not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIcon, RouterLink, MatButton],
})
export class NotFoundPageComponent {}
