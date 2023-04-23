import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  FinancialMovementItem,
  MovementType,
} from 'src/app/models/financial-movement-item.model';
import { FinancesUtils } from 'src/app/utils/finances.utils';
import { FinancialMovementNewComponent } from '../financial-movement-new/financial-movement-new.component';
import { FinancialMovementsManagementService } from 'src/app/services/financial-movements-management.service';
import { ConfirmationDialogComponent } from '../../ui-general/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-financial-movement-item',
  templateUrl: './financial-movement-item.component.html',
  styleUrls: ['./financial-movement-item.component.css'],
})
export class FinancialMovementItemComponent {
  @Input() financialMovement: FinancialMovementItem;

  constructor(
    public financesUtils: FinancesUtils,
    public dialog: MatDialog,
    private financialMovementMgmtService: FinancialMovementsManagementService
  ) {}

  public get movementType(): typeof MovementType {
    return MovementType;
  }

  onMovementItemEdit = () => {
    console.log(this.financialMovement);
    const dialogRef = this.dialog.open(FinancialMovementNewComponent, {
      autoFocus: true,
      width: '600px',
      data: this.financialMovement,
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        console.log(result);
        await this.financialMovementMgmtService.addNewFinancialMovement(result);
      }
    });
  };

  onMovementItemDelete = () => {
    console.log(this.financialMovement);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      autoFocus: true,
      width: '400px',
      data: {
        title: 'Delete financial movement',
        message:
          'Are you sure you want to delete financial movement ' +
          this.financialMovement.name +
          '?',
      },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        await this.financialMovementMgmtService.deleteFinancialMovement(this.financialMovement);
        await this.financialMovementMgmtService.getFinancialMovements();
      }
    });
  };
}
