import { Component } from '@angular/core';
import { MovementType } from 'src/app/models/financial-movement-item.model';
import { FinancialMovementsManagementService } from 'src/app/services/financial-movements-management.service';
import { FinancesUtils } from 'src/app/utils/finances.utils';

@Component({
  selector: 'app-financial-summary',
  templateUrl: './financial-summary.component.html',
  styleUrls: ['./financial-summary.component.css'],
})
export class FinancialSummaryComponent {
  constructor(
    public financesUtils: FinancesUtils,
    private financialMovementMgmtService: FinancialMovementsManagementService
  ) {}

  totalIncome: number = 0;
  totalExpense: number = 0;
  totalDifference: number = 0;

  ngOnInit() {
    this.getSummary();
  }

  getSummary() {
    this.financialMovementMgmtService.newRequestToServer.subscribe(
      (financialMovements) => {
        financialMovements.forEach((item) => {
          this.totalIncome +=
            item.movementType == MovementType.Income ? Number(item.value) : 0;
          this.totalExpense +=
            item.movementType == MovementType.Expense ? Number(item.value) : 0;
        });
        this.totalDifference = this.totalIncome - this.totalExpense;
      }
    );
  }
}
