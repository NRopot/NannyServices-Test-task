import { Directive, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserRoles } from '@app/declarations/enums/user-roles.enum';
import { CurrentUserStore } from '@app/stores/current-user.store';

@Directive({ selector: '[appHasAccess]', standalone: true })
export class HasAccessDirective {
  @Input({ required: true }) set appHasAccess(userRoles: UserRoles[]) {
    this.processUserRoleChanged(userRoles);
  }

  private readonly currentUserStore = inject(CurrentUserStore);

  constructor(
    private readonly viewContainerRef: ViewContainerRef,
    private readonly templateRef: TemplateRef<unknown>
  ) {}

  private processUserRoleChanged(userRoles: UserRoles[]): void {
    const currentUserRole: UserRoles = this.currentUserStore.role();

    if (userRoles.includes(currentUserRole)) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
      return;
    }

    this.viewContainerRef.clear();
  }
}
