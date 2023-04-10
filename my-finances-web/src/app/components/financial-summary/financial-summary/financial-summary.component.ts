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

  chartData = [];
  view: any[] = [1200, 400];
  xAxisLabel: string = 'Months';
  yAxisLabel: string = 'Value';
  barPadding: number = 4;
  groupPadding: number = 6;
  customColors = [
    {
      name: 'income',
      value: '#109010',
    },
    {
      name: 'expense',
      value: '#DE3636',
    },
  ];

  ngOnInit() {
    this.getSummary();
    this.getChartData();
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

  getChartData() {
    this.financialMovementMgmtService.newRequestToServer.subscribe((data) => {
      this.chartData = [];
      if (data.length > 0) {
        if (this.financialMovementMgmtService.month) {
          let year = this.financialMovementMgmtService.year;
          let month = this.financialMovementMgmtService.month;
          let daysInMonth = new Date(Number(year), Number(month), 0).getDate();
          for (let i = 1; i <= daysInMonth; i++) {
            let dataItem = {};
            if (this.financialMovementMgmtService.incomeVisible) {
              data.forEach((item) => console.log(new Date(item.date).getDate()))
              let incomeVal = data
                .filter(
                  (item) =>
                    new Date(item.date).getDate() + 1 === i &&
                    item.movementType === MovementType.Income
                )
                .reduce((a, b) => a + Number(b.value), 0);
              let expenseVal = data
                .filter(
                  (item) =>
                    new Date(item.date).getDate() + 1 === i &&
                    item.movementType === MovementType.Expense
                )
                .reduce((a, b) => a + Number(b.value), 0);
              dataItem = {
                name: i.toString(),
                series: [
                  { name: 'income', value: incomeVal },
                  { name: 'expense', value: expenseVal },
                ],
              };
              this.groupPadding = 6;
            } else {
            }
            this.chartData.push(dataItem);
          }
        } else {
          for (let i = 1; i <= 12; i++) {
            let dataItem = {};
            if (this.financialMovementMgmtService.incomeVisible) {
              let incomeVal = data
                .filter(
                  (item) =>
                    new Date(item.date).getMonth() + 1 === i &&
                    item.movementType === MovementType.Income
                )
                .reduce((a, b) => a + Number(b.value), 0);
              let expenseVal = data
                .filter(
                  (item) =>
                    new Date(item.date).getMonth() + 1 === i &&
                    item.movementType === MovementType.Expense
                )
                .reduce((a, b) => a + Number(b.value), 0);
              dataItem = {
                name: i.toString(),
                series: [
                  { name: 'income', value: incomeVal },
                  { name: 'expense', value: expenseVal },
                ],
              };
              this.groupPadding = 16;
            } else {
            }
            this.chartData.push(dataItem);
          }
        }
      }
      console.log(this.chartData);
    });
  }
}
