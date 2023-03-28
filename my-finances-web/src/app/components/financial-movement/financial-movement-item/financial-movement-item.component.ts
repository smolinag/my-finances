import { Component, Input } from '@angular/core';
import { FinancialMovementItem, MovementType } from 'src/app/models/financial-movement-item.model';

@Component({
  selector: 'app-financial-movement-item',
  templateUrl: './financial-movement-item.component.html',
  styleUrls: ['./financial-movement-item.component.css']
})
export class FinancialMovementItemComponent {
  @Input() financialMovement: FinancialMovementItem;

  public get movementType(): typeof MovementType {
    return MovementType; 
  }
}
