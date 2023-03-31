import { Component, Input } from '@angular/core';
import { FinancialMovementItem, MovementType } from 'src/app/models/financial-movement-item.model';
import { FinancesUtils } from 'src/app/utils/finances.utils';

@Component({
  selector: 'app-financial-movement-item',
  templateUrl: './financial-movement-item.component.html',
  styleUrls: ['./financial-movement-item.component.css']
})
export class FinancialMovementItemComponent {
  @Input() financialMovement: FinancialMovementItem;

  constructor(public financesUtils: FinancesUtils){}

  public get movementType(): typeof MovementType {
    return MovementType; 
  }
}
