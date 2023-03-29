import { EventEmitter, Injectable } from '@angular/core';
import {
  ExpenseCategory,
  FinancialMovementItem,
  IncomeCategory,
  MovementType,
} from 'src/app/models/financial-movement-item.model';
import { HttpClient } from '@angular/common/http';

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

  private financialMovements: FinancialMovementItem[] = [
    new FinancialMovementItem(
      'Factura luz',
      'Factura luz',
      54000,
      MovementType.Expense,
      null,
      null,
      '2023-03-12'
    ),
    new FinancialMovementItem(
      'Factura Agua',
      'Factura luz',
      54000,
      MovementType.Expense,
      null,
      null,
      '2023-03-12'
    ),
    new FinancialMovementItem(
      'Factura luz',
      'Factura luz',
      54000,
      MovementType.Expense,
      null,
      null,
      '2023-03-12'
    ),
    new FinancialMovementItem(
      'Factura luz',
      'Factura gas',
      54000,
      MovementType.Expense,
      null,
      null,
      '2023-03-10'
    ),
  ];

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

  getFinancialMovements() {
    console.log('Get financial movements: ');
    console.log(this.financialMovements);
    this.http
      .get(
        'https://qpk6gtfqz6.execute-api.us-east-1.amazonaws.com/?userId=123456'
      )
      .subscribe((data) => {
        console.log(data);
      });
    return this.financialMovements.slice();
  }

  setFinancialMovements(financialMovements: FinancialMovementItem[]) {
    this.financialMovements = financialMovements;
    console.log('Set financial movements: ' + this.financialMovements);
  }

  addNewFinancialMovement(financialMovement: FinancialMovementItem) {
    this.financialMovements.push(financialMovement);
    console.log('Added financial movement: ');
    console.log(financialMovement);
  }
}
