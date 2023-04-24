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
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { Amplify } from 'aws-amplify';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';

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
import { environment } from './environments/environment.local';
import { ConfirmationDialogComponent } from './components/ui-general/confirmation-dialog/confirmation-dialog.component';

Amplify.configure({
  Auth: {
    // Required for Cognito user pool
    region: 'us-east-1',
    userPoolId: environment.cognito.userPoolId,
    userPoolWebClientId: environment.cognito.userPoolWebClientId,
  },
});

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
    ConfirmationDialogComponent,
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
    NgxChartsModule,
    AmplifyAuthenticatorModule,
    MatProgressSpinnerModule
  ],
  providers: [
    FinancialMovementsManagementService,
    FilterControlComponent,
    FinancesUtils,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
