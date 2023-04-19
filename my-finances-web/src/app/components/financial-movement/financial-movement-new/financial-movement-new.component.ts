import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  ExpenseCategory,
  FinancialMovementItem,
  IncomeCategory,
  MovementType,
} from 'src/app/models/financial-movement-item.model';
import { FinancialMovementsManagementService } from 'src/app/services/financial-movements-management.service';

@Component({
  selector: 'app-financial-movement-new',
  templateUrl: './financial-movement-new.component.html',
  styleUrls: ['./financial-movement-new.component.css'],
})
export class FinancialMovementNewComponent {
  typeOptions = this.mapEnumForSelector(ExpenseCategory);

  isMobile: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<FinancialMovementNewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FinancialMovementItem,
    private financialMovementMgmtService: FinancialMovementsManagementService
  ) {}

  ngOnInit() {
    if (window.screen.width < 720) { // 768px portrait
      this.isMobile = true;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onMovementTypeChange(value) {
    if (value == 0) {
      this.data.movementType = MovementType.Expense;      
      this.typeOptions = this.mapEnumForSelector(ExpenseCategory);
    } else {
      this.data.movementType = MovementType.Income;
      this.typeOptions = this.mapEnumForSelector(IncomeCategory);  
    }
    this.financialMovementMgmtService.setDefaultIncomeExpenseCategory(this.data);
  }

  onExpenseOrIncomeCategoryChange(value){
    if(this.data.movementType == MovementType.Expense){
      this.data.expenseCategory = value
    } else {
      this.data.incomeCategory = value
    }
  }

  mapEnumForSelector(enumObject: any) {
    return Object.entries(enumObject).map(([key, value]) => ({ key, value }));
  }
}
