import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule, MatNavList, MatToolbarModule, MatIconModule, MatButtonModule, MatSidenavModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomerNavbarComponent } from './customer-navbar.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    NgbModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule
  ],
  declarations: [
    CustomerNavbarComponent
  ],
  exports: [
    CustomerNavbarComponent
  ]
})
export class CustomerNavbarModule { }
