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
    public financialMovementMgmtService: FinancialMovementsManagementService
  ) {}

  isMobile: boolean = false;

  totalIncome: number = 0;
  totalExpense: number = 0;
  totalDifference: number = 0;

  chartDataIncomeVisible = [];
  chartDataIncomeHidden = [];
  view: any[] = [1100, 380];
  xAxisLabel: string = 'Months';
  yAxisLabel: string = 'Value';
  barPaddingIncomeVisible: number = 4;
  barPaddingIncomeHidden: number = 12;
  groupPadding: number = 6;
  customColors2D = [
    {
      name: 'income',
      value: '#109010',
    },
    {
      name: 'expense',
      value: '#DE3636',
    },
  ];
  customColors1D = {
    domain: ['#DE3636'],
  };

  ngOnInit() {
    this.getSummary();
    this.getChartData();
    if (window.screen.width < 720) { // 768px portrait
      this.isMobile = true;
    }
  }

  getSummary() {
    this.financialMovementMgmtService.newRequestToServer.subscribe(
      (financialMovements) => {
        this.totalIncome = 0;
        this.totalExpense = 0;
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
      this.chartDataIncomeVisible = [];
      this.chartDataIncomeHidden = [];
      let dataItemIncomeVisible = {};
      let dataItemIncomeHidden = {};
      if (data.length > 0) {
        if (this.financialMovementMgmtService.month) {
          let year = this.financialMovementMgmtService.year;
          let month = this.financialMovementMgmtService.month;
          let daysInMonth = new Date(Number(year), Number(month), 0).getDate();
          console.log(data);
          for (let i = 1; i <= daysInMonth; i++) {
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

            dataItemIncomeVisible = {
              name: i.toString(),
              series: [
                { name: 'income', value: incomeVal },
                { name: 'expense', value: expenseVal },
              ],
            };

            dataItemIncomeHidden = {
              name: i.toString(),
              value: expenseVal,
            };

            this.barPaddingIncomeVisible = 4;
            this.barPaddingIncomeHidden = 16;
            this.groupPadding = 6;
            this.chartDataIncomeVisible.push(dataItemIncomeVisible);
            this.chartDataIncomeHidden.push(dataItemIncomeHidden);
          }
        } else {
          for (let i = 1; i <= 12; i++) {
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
            dataItemIncomeVisible = {
              name: i.toString(),
              series: [
                { name: 'income', value: incomeVal },
                { name: 'expense', value: expenseVal },
              ],
            };
            
            dataItemIncomeHidden = {
              name: i.toString(),
              value: expenseVal,
            };

            this.barPaddingIncomeVisible = 8;
            this.barPaddingIncomeHidden = 48;
            this.groupPadding = 16;
            this.chartDataIncomeVisible.push(dataItemIncomeVisible);
            this.chartDataIncomeHidden.push(dataItemIncomeHidden);
          }
        }
      }
    });
  }
}
