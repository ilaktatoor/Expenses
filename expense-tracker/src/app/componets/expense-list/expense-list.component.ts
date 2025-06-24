import { Component, inject } from '@angular/core';
import { Expense } from '../../models/expense.model';
import { ExpenseService } from '../../services/expense.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.css'
})
export class ExpenseListComponent {
  private expenseService = inject(ExpenseService);
  expenses: Expense[] = [];

  constructor() {
    this.loadExpenses();
    this.expenseService.refreshNeeded$.subscribe(() => {
      this.loadExpenses();
    });
  }

  loadExpenses() {
    this.expenseService.getThisWeek().subscribe(data => this.expenses = data);
  }

  deleteExpense(expense: Expense) {
    this.expenseService.delete((expense as any).id).subscribe(() => this.loadExpenses());
  }
}
