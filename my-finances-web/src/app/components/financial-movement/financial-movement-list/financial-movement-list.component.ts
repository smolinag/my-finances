import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  FinancialMovementItem,
  MovementType,
} from 'src/app/models/financial-movement-item.model';
import { FinancialMovementNewComponent } from '../financial-movement-new/financial-movement-new.component';
import { FinancialMovementsManagementService } from 'src/app/services/financial-movements-management.service';

@Component({
  selector: 'app-financial-movement-list',
  templateUrl: './financial-movement-list.component.html',
  styleUrls: ['./financial-movement-list.component.css'],
})
export class FinancialMovementListComponent {
  financialMovements: FinancialMovementItem[] = [];
  financialMovementsByDay: {
    date: string;
    financialMovements: FinancialMovementItem[];
  }[] = [];

  newFinancialMovement: FinancialMovementItem =
    this.financialMovementMgmtService.setDefaultIncomeExpenseCategory(
      new FinancialMovementItem()
    );

  constructor(
    public dialog: MatDialog,
    private financialMovementMgmtService: FinancialMovementsManagementService
  ) {}

  async ngOnInit() {
    this.financialMovements =
      await this.financialMovementMgmtService.getFinancialMovements();
    this.setFinancialMovementsByDay(this.financialMovements);
    this.financialMovementMgmtService.newFiltersSelection.subscribe(
      async () => {
        await this.financialMovementMgmtService.getFinancialMovements();
      }
    );
    this.financialMovementMgmtService.newIncomeVisibleStatus.subscribe(
      async () => {
        this.setFinancialMovementsByDay(this.financialMovements);
      }
    );
    this.financialMovementMgmtService.newRequestToServer.subscribe(
      async (financialMovements) => {
        this.setFinancialMovementsByDay(financialMovements);
      }
    );
  }

  openDialog() {
    const dialogRef = this.dialog.open(FinancialMovementNewComponent, {
      autoFocus: true,
      width: '600px',
      data: this.newFinancialMovement,
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        await this.financialMovementMgmtService.addNewFinancialMovement(result);
        this.financialMovements =
          await this.financialMovementMgmtService.getFinancialMovements();
        this.setFinancialMovementsByDay(this.financialMovements);
        this.newFinancialMovement =
          this.financialMovementMgmtService.setDefaultIncomeExpenseCategory(
            new FinancialMovementItem()
          );
      }
    });
  }

  setFinancialMovementsByDay(financialMovements: FinancialMovementItem[]) {
    this.financialMovementsByDay = [];
    financialMovements.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    const incomeVisibleFlag = this.financialMovementMgmtService.incomeVisible;
    financialMovements.forEach((movement) => {
      if (incomeVisibleFlag || movement.movementType === MovementType.Expense) {
        let date = movement.date;
        let dayMovementsArr = this.financialMovementsByDay.filter(
          (item) => item.date === date
        );
        if (dayMovementsArr.length > 0) {
          let dayMovements = dayMovementsArr[0];
          dayMovements.financialMovements.push(movement);
        } else {
          this.financialMovementsByDay.push({
            date: date,
            financialMovements: [movement],
          });
        }
      }
    });
  }
}
