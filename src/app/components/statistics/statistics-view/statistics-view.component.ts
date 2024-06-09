import {Component, ElementRef, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import Chart from 'chart.js/auto';
import Masonry from 'masonry-layout';

@Component({
  selector: 'app-statistics-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistics-view.component.html',
  styleUrl: './statistics-view.component.css'
})
export class StatisticsViewComponent implements OnInit {
  totalUsers: number = 10;
  totalGroups: number = 3;
  totalLists: number = 15;
  totalElements: number = 5;

  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewInit(): void {
    // const grid = new Masonry(this.elementRef.nativeElement.querySelector('.masonry'), {
    //   itemSelector: '.col-12',
    // });
  }

  ngOnInit() {
    const GenericData = {
      labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
      datasets: [{
        label: 'Cantidad de Elementos Agregados',
        data: [10, 20, 15, 25],
        borderColor: 'blue',
        fill: false
      }]
    };
    const ctx = document.getElementById('users') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: GenericData,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    const ctx1 = document.getElementById('logins') as HTMLCanvasElement;
    new Chart(ctx1, {
      type: 'line',
      data: GenericData,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    const ctx2 = document.getElementById('groupsCreated') as HTMLCanvasElement;
    new Chart(ctx2, {
      type: 'line',
      data: GenericData,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });


    const ctx3 = document.getElementById('listsCreated') as HTMLCanvasElement;
    new Chart(ctx3, {
      type: 'line',
      data: GenericData,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    const ctx4 = document.getElementById('elementsCreated') as HTMLCanvasElement;
    new Chart(ctx4, {
      type: 'line',
      data: GenericData,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    const chartTypeData = {
      labels: ['Notas', 'Recordatorios', 'Eventos', 'Compras', 'Cuentas'],
      datasets: [{
        label: 'Tipos',
        data: [10, 5, 8, 12, 7],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)', // Red
          'rgba(54, 162, 235, 0.5)', // Blue
          'rgba(255, 206, 86, 0.5)', // Yellow
          'rgba(75, 192, 192, 0.5)', // Green
          'rgba(153, 102, 255, 0.5)' // Purple
        ]
      }]
    };

    const elementTypesChart = document.getElementById('elementTypesChart') as HTMLCanvasElement;
    new Chart(elementTypesChart, {
      type: 'bar',
      data: chartTypeData,
      options: {
        indexAxis: 'y',
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true
          }
        }
      }
    });

    const elementCountChart = document.getElementById('elementCountChart') as HTMLCanvasElement;
    new Chart(elementCountChart, {
      type: 'bar',
      data: chartTypeData,
      options: {
        indexAxis: 'y',
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true
          }
        }
      }
    });

  }
}
