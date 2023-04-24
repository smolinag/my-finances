import { Component, HostListener } from '@angular/core';
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

  isMobile: boolean = window.screen.width < 720;

  totalIncome: number = 0;
  totalExpense: number = 0;
  totalDifference: number = 0;

  chartDataIncomeVisible = [];
  chartDataIncomeHidden = [];
  view: number[] = [window.screen.width * 0.75, window.screen.width * 0.25];
  barPaddingIncomeVisible: number = Math.ceil(window.screen.width / 360 - 2);
  barPaddingIncomeHidden: number = Math.ceil(window.screen.width / 90 - 5);
  groupPadding: number = Math.ceil(window.screen.width / 240 - 2);
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

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isMobile = event.target.innerWidth < 720;
    this.view = [
      event.target.innerWidth * 0.75,
      event.target.innerWidth * 0.25,
    ];

    if (this.financialMovementMgmtService.month) {
      this.barPaddingIncomeHidden = Math.ceil(event.target.innerWidth / 90 - 5);
      this.barPaddingIncomeVisible = Math.ceil(
        event.target.innerWidth / 360 - 2
      );
      this.groupPadding = Math.ceil(event.target.innerWidth / 240 - 2);
    } else {
      this.barPaddingIncomeHidden = Math.ceil(
        event.target.innerWidth / 20 - 20
      );
      this.barPaddingIncomeVisible = Math.ceil(
        event.target.innerWidth / 144 - 5
      );
      this.groupPadding = Math.ceil(event.target.innerWidth / 84 - 9);
    }
    console.log(this.barPaddingIncomeVisible);
  }

  ngOnInit() {
    this.getSummary();
    this.getChartData();
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

            this.chartDataIncomeVisible.push(dataItemIncomeVisible);
            this.chartDataIncomeHidden.push(dataItemIncomeHidden);
          }
        }
      }
    });
  }
}
