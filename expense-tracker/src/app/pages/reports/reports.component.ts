import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { NavbarComponent } from '../../componets/navbar/navbar.component';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule,NavbarComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements AfterViewInit{
  @ViewChild('categoryChart') categoryChartRef!: ElementRef;
  @ViewChild('userChart') userChartRef!: ElementRef;

  ngAfterViewInit(): void {
    Chart.register(...registerables);

    new Chart(this.categoryChartRef.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Groceries', 'Rent', 'Utilities', 'Entertainment'],
        datasets: [{
          data: [300, 500, 100, 150],
          backgroundColor: ['#60a5fa', '#34d399', '#fbbf24', '#f87171']
        }]
      },
      options: {
        responsive: true
      }
    });

    new Chart(this.userChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Person 1', 'Person 2'],
        datasets: [{
          label: 'This Week',
          data: [450, 250],
          backgroundColor: ['#3b82f6', '#10b981']
        }]
      },
      options: {
        responsive: true
      }
    });
  }
}
