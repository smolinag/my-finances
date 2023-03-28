import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    AppRoutingModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatRadioModule,
    FormsModule,
  ],
  providers: [FinancialMovementsManagementService],
  bootstrap: [AppComponent],
})
export class AppModule {}
