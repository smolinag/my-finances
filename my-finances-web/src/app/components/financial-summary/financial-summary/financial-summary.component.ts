import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import {
  FinancialMovementItem,
  MovementType,
} from 'src/app/models/financial-movement-item.model';
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

  @ViewChild('divToMeasure') divToMeasureElement: ElementRef;
  isMobile: boolean = window.screen.width < 720;
  isLoading: boolean = true;

  chartSel: string = "Categories";
  chartOptions: string[] = ["Categories", "Time"];

  totalIncome: number = 0;
  totalExpense: number = 0;
  totalDifference: number = 0;

  chartDataIncomeVisible = [];
  chartDataIncomeHidden = [];
  view: number[];
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

  expenseCategoriesChartData: { name: string; value: number }[] = [];

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isMobile = event.target.innerWidth < 720;
    const width = this.divToMeasureElement.nativeElement.offsetWidth;
    this.view = [width, this.isMobile ? width * 0.5 : width * 0.3];
    this.setPlotSpacing();
  }

  ngOnInit() {
    this.isLoading = true;
    this.getSummary();
    this.getTimeChartData();
    this.getCategoriesChartData();
  }

  ngAfterViewInit() {
    const width = this.divToMeasureElement.nativeElement.offsetWidth;
    this.view = [width, this.isMobile ? width * 0.5 : width * 0.3];
  }

  setPlotSpacing() {
    const width = this.divToMeasureElement.nativeElement.offsetWidth;
    if (this.financialMovementMgmtService.month) {
      this.barPaddingIncomeHidden = Math.ceil(width / 44 - 6);
      this.barPaddingIncomeVisible = Math.ceil(width / 390);
      this.groupPadding = Math.ceil(width / 260 - 1);
    } else {
      this.barPaddingIncomeHidden = Math.ceil(width / 14 - 18);
      this.barPaddingIncomeVisible = Math.ceil(width / 130 - 2);
      this.groupPadding = Math.ceil(width / 87 - 3);
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

  getTimeChartData() {
    this.financialMovementMgmtService.newRequestToServer.subscribe((data) => {
      this.chartDataIncomeVisible = [];
      this.chartDataIncomeHidden = [];
      let dataItemIncomeVisible = {};
      let dataItemIncomeHidden = {};
      this.setPlotSpacing();
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
      this.isLoading = false;
    });
  }

  setYAxisTicksValues(tick: number) {
    const isMobile = window.screen.width < 620;
    return isMobile ? tick / 1000 : tick;
  }

  getCategoriesChartData() {
    this.financialMovementMgmtService.newRequestToServer.subscribe(
      (data: FinancialMovementItem[]) => {
        this.expenseCategoriesChartData = [];
        data.forEach((item) => {
          if (item.movementType == MovementType.Expense) {
            const category = item.expenseCategory;
            const value = Number(item.value);
            const pieChartCategory = this.expenseCategoriesChartData.find(
              (cat) => cat.name === category
            );
            if (pieChartCategory) {
              pieChartCategory.value += value;
            } else {
              this.expenseCategoriesChartData.push({ name: category, value: value });
            }
          }
        });
        console.log("Categories:")
        console.log(this.expenseCategoriesChartData)
      }
    );
  }

  chartCategoryChange(event){
    this.chartSel = event;
  }
}
