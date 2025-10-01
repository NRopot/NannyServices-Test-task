import { UserRoles } from '@app/declarations/enums/user-roles.enum';

export interface User {
  readonly id: string;
  readonly username: string;
  readonly password: string;
  readonly firstName: string;
  readonly lastName?: string;
  readonly address?: string;
  readonly photoUrl?: string;
  readonly role: UserRoles;
}
