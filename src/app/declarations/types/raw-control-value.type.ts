import { AbstractControl } from '@angular/forms';

export type RawControlValue<T extends AbstractControl> = ReturnType<T['getRawValue']>;
