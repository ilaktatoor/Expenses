import { Component, inject } from '@angular/core';
import { WeeklySummary } from '../../models/weekly-summary.model';
import { CommonModule } from '@angular/common';
import { ExpenseService } from '../../services/expense.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-expense-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expense-summary.component.html',
  styleUrl: './expense-summary.component.css'
})
export class ExpenseSummaryComponent {
  private expenseService = inject(ExpenseService); summary: WeeklySummary | null = null;

  constructor() {
    this.loadSummary();
    this.expenseService.refreshNeeded$.subscribe(() => {
      this.loadSummary();
    });
  }

  loadSummary() {
    this.expenseService.getSummary().subscribe(data => this.summary = data);
  }

  markAsEven() {
    Swal.fire({
      title: 'Mark this week as even?',
      text: 'This will settle the balance between users.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#16a34a',
      cancelButtonColor: '#dc2626',
      confirmButtonText: 'Yes, mark as even'
    }).then(result => {
      if (result.isConfirmed) {
        this.expenseService.markWeekAsEven().subscribe(() => {
          Swal.fire('Success', 'Week marked as even.', 'success');
          this.loadSummary();
        });
      }
    });
  }
}
