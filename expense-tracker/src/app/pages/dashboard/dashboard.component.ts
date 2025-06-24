import { Component } from '@angular/core';
import { ExpenseSummaryComponent } from '../../componets/expense-summary/expense-summary.component';
import { ExpenseListComponent } from '../../componets/expense-list/expense-list.component';
import { ExpenseFormComponent } from '../../componets/expense-form/ExpenseFormComponent';
import { NavbarComponent } from '../../componets/navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,
    NavbarComponent,
    ExpenseFormComponent,
    ExpenseListComponent,
    ExpenseSummaryComponent,
    ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
