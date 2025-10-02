import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatListItem, MatNavList } from '@angular/material/list';
import { CustomerServiceService } from '@app/pages/customers-page/services/customer.service';
import { MatIcon } from '@angular/material/icon';
import { ActionsBottomSheetData } from '@app/pages/customers-page/declarations/interfaces/actions-bottom-sheet-data.interface';

@Component({
  selector: 'app-actions-bottom-sheet',
  templateUrl: 'actions-bottom-sheet.component.html',
  styleUrls: ['./actions-bottom-sheet.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatNavList, MatIcon, MatListItem],
})
export class ActionsBottomSheetComponent {
  public readonly data: ActionsBottomSheetData = inject(MAT_BOTTOM_SHEET_DATA);

  private readonly bottomSheetRef: MatBottomSheetRef<ActionsBottomSheetComponent> =
    inject<MatBottomSheetRef<ActionsBottomSheetComponent>>(MatBottomSheetRef);

  private readonly customerServiceService: CustomerServiceService = this.data.injector.get(CustomerServiceService);

  public openDialog(id?: string, isReadonly: boolean = false): void {
    this.customerServiceService.openDialog(id, isReadonly);
    this.bottomSheetRef.dismiss();
  }
}
