import { Component } from '@angular/core';
import { FinancialMovementsManagementService } from 'src/app/services/financial-movements-management.service';

@Component({
  selector: 'app-filter-control',
  templateUrl: './filter-control.component.html',
  styleUrls: ['./filter-control.component.css'],
})
export class FilterControlComponent {
  constructor(
    private financialMovementMgmtService: FinancialMovementsManagementService
  ) {}

  years: { key: string; value: string }[] = [
    { key: '2022', value: '2022' },
    { key: '2023', value: '2023' },
  ];
  public months: { key: string; value: string }[] = [
    { key: '1', value: 'January' },
    { key: '2', value: 'February' },
    { key: '3', value: 'March' },
    { key: '4', value: 'April' },
    { key: '5', value: 'May' },
    { key: '6', value: 'June' },
    { key: '7', value: 'July' },
    { key: '8', value: 'August' },
    { key: '9', value: 'September' },
    { key: '10', value: 'October' },
    { key: '11', value: 'November' },
    { key: '12', value: 'December' },
    { key: '13', value: 'All' },
  ];

  public year: string = new Date().getFullYear().toString();
  public month: string = (new Date().getMonth() + 1).toString();

  onSearch() {
    this.financialMovementMgmtService.setNewFilterSelection({
      year: this.year,
      month: this.month != "13" ? this.month : null,
    });
  }
}
