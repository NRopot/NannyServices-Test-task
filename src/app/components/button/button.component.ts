import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-button',
  templateUrl: 'button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButton, MatIcon, NgIf],
})
export class ButtonComponent {
  @Input() public iconName: string | null = null;
  @Input() public disabled: boolean = false;
}
