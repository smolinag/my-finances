export class FinancesUtils {
  mapValueToCurrency(value: number) {
    let COPCurrencyFormat = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
    });
    return COPCurrencyFormat.format(value);
  }
}
