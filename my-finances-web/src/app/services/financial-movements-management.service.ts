import { EventEmitter, Injectable } from '@angular/core';
import {
  ExpenseCategory,
  FinancialMovementItem,
  IncomeCategory,
  MovementType,
} from 'src/app/models/financial-movement-item.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment.local';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FinancialMovementsManagementService {
  userId: string = '123456';
  date: string = new Date().toISOString().split('T')[0];
  year: string = this.date.split('-')[0];
  month: string = this.date.split('-')[1];
  movementType: string = '';
  expenseCategory: string = '';
  incomeCategory: string = '';

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

  async getFinancialMovements() {
    let params = new HttpParams();
    params = params.append('userId', this.userId);
    let response = await firstValueFrom(
      this.http.get(environment.apiUrl, { params: params })
    );
    let data = response as FinancialMovementItem[];
    console.log('Get financial movements: ');
    console.log(data);
    return data;
  }

  async addNewFinancialMovement(financialMovement: FinancialMovementItem) {
    financialMovement.userId = this.userId;
    let data = await firstValueFrom(
      this.http.post(environment.apiUrl, JSON.stringify(financialMovement))
    );
    console.log('Added financial movement: ');
    console.log(data);
  }
}
