export class FinancialMovementItem {
  public userId: string;
  public name: string;
  public description: string;
  public value: number;
  public movementType: MovementType;
  public expenseCategory: ExpenseCategory;
  public incomeCategory: IncomeCategory;
  public date: string;
  public rangeId: string;

  constructor(
    userId: string = "",
    name: string = "",
    desc: string = "",
    value: number = 0,
    movementType: MovementType = MovementType.Expense,
    expenseCategory: ExpenseCategory = null,
    incomeCategory: IncomeCategory = null,
    date: string = (new Date()).toISOString().split('T')[0]
  ) {
    this.userId = userId;
    this.name = name;
    this.description = desc;
    this.value = value;
    this.movementType = movementType;
    this.expenseCategory = expenseCategory;
    this.incomeCategory = incomeCategory;
    this.date = date;
  }
}

export enum MovementType {
  Expense = 'Expense',
  Income = 'Income',
}

export enum ExpenseCategory {
  Facturas = 'Facturas',
  Mercado = 'Mercado',
  Compras = 'Compras',
  Deudas = 'Deudas',
  Prestamos = 'Prestamos',
  Viajes = 'Viajes',
  Ahorros = 'Ahorros',
  Otros = 'Otros'
}

export enum IncomeCategory {
  Salario = 'Salario',
  Arriendos = 'Arriendos',
  Ventas = 'Ventas',
  Dividendos = 'Dividendos',
  Honorarios = 'Honorarios',
  Otros = 'Otros'
}
