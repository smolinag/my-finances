import { EventEmitter } from '@angular/core';
import {
  ExpenseCategory,
  FinancialMovementItem,
  IncomeCategory,
  MovementType,
} from 'src/app/models/financial-movement-item.model';

export class FinancialMovementsManagementService {

  userId: string = '123456';
  date: string = new Date().toISOString().split('T')[0];
  year: string = this.date.split('-')[0];
  month: string = this.date.split('-')[1];
  movementType: string = '';
  expenseCategory: string = '';
  incomeCategory: string = '';

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

  setYear(year: string){
    this.year = year
  }

  getYear(){
    return this.year
  }

  setMonth(month: string){
    this.month = month
  }

  getMonth(){
    return this.month
  }

  setDefaultIncomeExpenseCategory(movement: FinancialMovementItem){
    if(movement.movementType == MovementType.Expense){
      movement.expenseCategory = ExpenseCategory.Facturas;
      movement.incomeCategory = null;
    } else {
      movement.expenseCategory = null;
      movement.incomeCategory = IncomeCategory.Salario;      
    }
    return movement;
  }

  getFinancialMovements(){
    console.log("Get financial movements: " + this.financialMovements);
    return this.financialMovements.slice();
  }

  setFinancialMovements(financialMovements: FinancialMovementItem[]){
    this.financialMovements = financialMovements;
    console.log("Set financial movements: " + this.financialMovements);
  }

  addNewFinancialMovement(financialMovement: FinancialMovementItem){
    this.financialMovements.push(financialMovement);
    console.log("Added financial movement: ");
    console.log(financialMovement)
  }
}
