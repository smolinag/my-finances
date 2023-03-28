import { Component, Input } from '@angular/core';
import { FinancialMovementItem } from 'src/app/models/financial-movement-item.model';

@Component({
  selector: 'app-financial-movement-day',
  templateUrl: './financial-movement-day.component.html',
  styleUrls: ['./financial-movement-day.component.css']
})
export class FinancialMovementDayComponent {
  @Input() financialMovements: FinancialMovementItem[];
  @Input() date: Date;

  formatDate(date: Date){
    return date.toLocaleDateString('en-US', {weekday: 'long'}) + ", " + date.getDate();
  }
}
