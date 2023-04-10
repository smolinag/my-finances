import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { FinancialMovementsManagementService } from './services/financial-movements-management.service';

import { AppComponent } from './app.component';
import { MainComponent } from './components//main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { FinancialMovementItemComponent } from './components/financial-movement/financial-movement-item/financial-movement-item.component';
import { FinancialMovementListComponent } from './components/financial-movement/financial-movement-list/financial-movement-list.component';
import { FinancialSummaryComponent } from './components/financial-summary/financial-summary/financial-summary.component';
import { FinancialMovementDayComponent } from './components/financial-movement/financial-movement-day/financial-movement-day.component';
import { FilterControlComponent } from './components/filter-control/filter-control.component';
import { FinancialMovementNewComponent } from './components/financial-movement/financial-movement-new/financial-movement-new.component';
import { FinancesUtils } from './utils/finances.utils';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    FinancialMovementItemComponent,
    FinancialMovementListComponent,
    FinancialSummaryComponent,
    FinancialMovementDayComponent,
    FilterControlComponent,
    FinancialMovementNewComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatRadioModule,
    FormsModule,
    MatIconModule,
    NgxChartsModule
  ],
  providers: [
    FinancialMovementsManagementService,
    FilterControlComponent,
    FinancesUtils,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
