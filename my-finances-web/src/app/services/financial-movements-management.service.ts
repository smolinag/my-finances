import { EventEmitter, Injectable, Output } from '@angular/core';
import {
  ExpenseCategory,
  FinancialMovementItem,
  IncomeCategory,
  MovementType,
} from 'src/app/models/financial-movement-item.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment.local';
import { firstValueFrom } from 'rxjs';
import { SearchFilters } from '../models/search-filters.model';

@Injectable()
export class FinancialMovementsManagementService {
  @Output() newFiltersSelection = new EventEmitter<SearchFilters>();
  @Output() newRequestToServer = new EventEmitter<FinancialMovementItem[]>();
  financialMovements: FinancialMovementItem[] = [];

  userId: string = '';
  year: string = new Date().getFullYear().toString();
  month: string = (new Date().getMonth() + 1).toString();
  incomeVisible: boolean = true;

  constructor(private http: HttpClient) {}

  setDefaultIncomeExpenseCategory(movement: FinancialMovementItem) {
    if (movement.movementType == MovementType.Expense) {
      movement.expenseCategory = ExpenseCategory.Facturas;
      movement.incomeCategory = null;
    } else {
      movement.expenseCategory = null;
      movement.incomeCategory = IncomeCategory.Salario;
    }
    return movement;
  }

  async getFinancialMovements(getFromCache: boolean = false) {
    if (!getFromCache) {
      let params = new HttpParams();
      params = params.append('userId', this.userId);
      if (this.year) {
        params = params.append('year', this.year);
      }
      if (this.month) {
        params = params.append('month', this.month.padStart(2, '0'));
      }
      let response = await firstValueFrom(
        this.http.get(environment.apiUrl, { params: params })
      );
      let data = response as FinancialMovementItem[];
      this.financialMovements = data;
      console.log('Get financial movements: ');
      console.log(data);
      this.newRequestToServer.emit(data);
      return data;
    } else {
      return this.financialMovements;
    }
  }

  async addNewFinancialMovement(financialMovement: FinancialMovementItem) {
    financialMovement.userId = this.userId;
    let data = await firstValueFrom(
      this.http.post(environment.apiUrl, JSON.stringify(financialMovement))
    );
    console.log('Added financial movement: ');
    console.log(data);
  }

  setNewFilterSelection(filters: SearchFilters) {
    this.year = filters.year;
    this.month = filters.month;
    this.newFiltersSelection.emit(filters);
  }

  setUserId(userID: string){
    this.userId = userID;
  }
}
