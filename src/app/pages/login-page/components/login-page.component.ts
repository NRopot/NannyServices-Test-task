import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginForm } from '@app/declarations/interfaces/login-form.interface';
import { CommonModule } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ButtonComponent } from '@app/components/button/button.component';
import { RawControlValue } from '@app/declarations/types/raw-control-value.type';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: 'login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconButton,
    MatIcon,
    ButtonComponent,
  ],
})
export class LoginPageComponent {
  public readonly controls: LoginForm = {
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
  };

  public readonly formGroup: FormGroup<LoginForm> = new FormGroup(this.controls);
  constructor(private readonly authService: AuthService) {}

  public signIn(): void {
    const { username, password }: RawControlValue<FormGroup<LoginForm>> = this.formGroup.getRawValue();
    this.authService.login(username, password);
  }
}
