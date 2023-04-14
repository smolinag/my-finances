import { Component, Input } from '@angular/core';
import { FinancialMovementsManagementService } from 'src/app/services/financial-movements-management.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  @Input() userEmail: any= ""; 

  constructor(private financialMovementMgmtService: FinancialMovementsManagementService){}

  ngOnInit() {
    this.financialMovementMgmtService.setUserId(this.userEmail);
  }
}
