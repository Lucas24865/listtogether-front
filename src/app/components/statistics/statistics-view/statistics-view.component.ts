import { Component, ElementRef, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  constructor(private elementRef: ElementRef) {}
  ngAfterViewInit(): void {
    // const grid = new Masonry(this.elementRef.nativeElement.querySelector('.masonry'), {
    //   itemSelector: '.col-12', 
    // });
  }
  ngOnInit() {
    const data = {
      labels: ['Lucas', 'Ce'],
      datasets: [{
        data: [2, 5],
        backgroundColor: ['black', 'pink']
      }]
    };

    const ctx = document.getElementById('familyChart1') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'pie',
      data: data,
      options: {
        plugins: {
          legend: {
            position: 'bottom'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.label + ': ' + context.formattedValue;
              }
            }
          }
        }
      }
    });

    const data2 = {
      labels: ['Lucas', 'Ce'],
      datasets: [{
        label: 'Cantidad',
        data: [6, 9],
        backgroundColor: ['black', 'pink']
      }]
    };

    const ctx2 = document.getElementById('familyChart2') as HTMLCanvasElement;
    new Chart(ctx2, {
      type: 'bar',
      data: data2,
      options: {
        indexAxis: 'y',
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });

    const data3 = {
      labels: ['Lucas', 'Joa', 'Juan'],
      datasets: [{
        label: 'Participación',
        data: [6, 4, 3],
        backgroundColor: ['black', 'orange', 'blue']
      }]
    };

    const ctx3 = document.getElementById('friendsChart1') as HTMLCanvasElement;
    new Chart(ctx3, {
      type: 'bar',
      data: data3,
      options: {
        scales: {
          x: {
            max: 6,
            beginAtZero: true
          }
        }
      }
    });

    const data4 = {
      labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
      datasets: [{
        label: 'Cantidad de Elementos Agregados',
        data: [10, 20, 15, 25],
        borderColor: 'blue',
        fill: false
      }]
    };

    const ctx4 = document.getElementById('familyChart3') as HTMLCanvasElement;
    new Chart(ctx4, {
      type: 'line',
      data: data4,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    const data5 = {
      labels: ['Notas', 'Recordatorios', 'Eventos', 'Compras', 'Cuentas'],
      datasets: [{
        label: 'Elementos Usados',
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

    const ctx5 = document.getElementById('friendsChart2') as HTMLCanvasElement;
    new Chart(ctx5, {
      type: 'bar',
      data: data5,
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
