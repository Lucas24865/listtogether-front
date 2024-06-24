import {Component, ElementRef, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminService} from '../../../services/admin.service';
import Chart from 'chart.js/auto';
import Swal from "sweetalert2";
import {IDashStats} from "../../../models/statsResponse";
import {IDashGraphs} from "../../../models/graphsResponse";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {D} from "@angular/cdk/keycodes";

@Component({
    selector: 'app-statistics-view',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
    templateUrl: './statistics-view.component.html',
    styleUrl: './statistics-view.component.css'
})
export class StatisticsViewComponent implements OnInit {
    maxDateDiffDays = 5
    dashStats: IDashStats = {} as IDashStats
    graphsData: IDashGraphs = {} as IDashGraphs
    from: string = ""
    to: string = ""
    today: string = ""
    minDate: string = ""
    advancedChartsInited = false
    usersChart: any
    loginChart: any
    groupsChart: any
    listsChart: any

    constructor(private elementRef: ElementRef, private adminService: AdminService) {
    }

    ngOnInit(): void {
        Swal.fire({
            title: 'Cargando...',
            text: 'Por favor espere',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        let today = new Date()
        this.to = today.toISOString().substring(0, 10)
        this.today = today.toISOString().substring(0, 10)

        const sevenDaysAgoDate = new Date();
        sevenDaysAgoDate.setDate(today.getDate() - this.maxDateDiffDays);
        this.from = sevenDaysAgoDate.toISOString().substring(0, 10)
        this.minDate = sevenDaysAgoDate.toISOString().substring(0, 10)

        this.adminService.getStats().subscribe((data) => {
            this.dashStats = data.msg;
            console.log(data.msg);
            this.InitStatsGraphs();
            Swal.close();
        }, (error) => {
            console.error(error);
            Swal.close();
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al cargar los datos',
            });
        });
    }

    searchData() {
        Swal.fire({
            title: 'Cargando...',
            text: 'Por favor espere',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        let from = new Date(this.from)
        let to = new Date(this.to)

        this.adminService.getGraphs({From: from.toISOString(), To: to.toISOString()}).subscribe((data) => {
            console.log(data.msg);
            this.graphsData = data.msg;
            if (!this.advancedChartsInited) {
                this.InitAdvancedGraphs();
            } else {
                this.ReloadAdvancedGraphs();
            }
            Swal.close();
        }, (error) => {
            console.error(error);
            Swal.close();
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al cargar los datos',
            });
        });
    }

    InitStatsGraphs() {
      console.log(this.dashStats.ListsTypes)
        const ListsTypeData = {
            labels: ['Cuentas', 'Eventos', 'Notas', 'Recordatorios', 'Compras'],
            datasets: [{
                label: 'Tipos',
                data: Object.values(this.dashStats.ListsTypes),
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
            type: 'pie',
            data: ListsTypeData,
            options: {
                layout: {
                    padding: {
                        left: -50,
                        right: -50
                    }
                },
                radius: "100%",
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                }
            }
        });
        const ElementsTypeData = {
            labels: ['Cuentas', 'Eventos', 'Notas', 'Recordatorios', 'Compras'],
            datasets: [{
                label: 'Tipos',
                data: Object.values(this.dashStats.ElementsTypes),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)', // Red
                    'rgba(54, 162, 235, 0.5)', // Blue
                    'rgba(255, 206, 86, 0.5)', // Yellow
                    'rgba(75, 192, 192, 0.5)', // Green
                    'rgba(153, 102, 255, 0.5)' // Purple
                ]
            }]
        };
        const elementCountChart = document.getElementById('elementCountChart') as HTMLCanvasElement;
        new Chart(elementCountChart, {
            type: 'pie',
            data: ElementsTypeData,
            options: {
                layout: {
                    padding: {
                        left: -50,
                        right: -50
                    }
                },
                radius: "100%",
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                }
            }
        });
    }

    ReloadAdvancedGraphs() {
        this.refreshData(this.usersChart, Object.keys(this.graphsData.UsersCreated), Object.values(this.graphsData.UsersCreated))

        this.refreshData(this.loginChart, Object.keys(this.graphsData.Logins), Object.values(this.graphsData.Logins))

        this.refreshData(this.groupsChart, Object.keys(this.graphsData.GroupsCreated), Object.values(this.graphsData.GroupsCreated))

        this.refreshData(this.listsChart, Object.keys(this.graphsData.ListsCreated), Object.values(this.graphsData.ListsCreated))

    }

    refreshData(chart: any, label: any, newData: any) {
        chart.data.labels = label;
        chart.data.datasets.forEach((dataset: any) => {
            dataset.data = newData;
        });
        chart.update();
    }

    InitAdvancedGraphs() {
        this.advancedChartsInited = true
        const usersData = {
            labels: Object.keys(this.graphsData.UsersCreated),
            datasets: [{
                label: 'Usuarios registrados',
                data: Object.values(this.graphsData.UsersCreated),
                borderColor: 'blue',
                fill: false
            }]
        };
        const usersCtx = document.getElementById('users') as HTMLCanvasElement;
        this.usersChart = new Chart(usersCtx, {
            type: 'line',
            data: usersData,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        const loginsData = {
            labels: Object.keys(this.graphsData.Logins),
            datasets: [{
                label: 'Inicios de sesión',
                data: Object.values(this.graphsData.Logins),
                borderColor: 'blue',
                fill: false
            }]
        };
        const loginsCtx = document.getElementById('logins') as HTMLCanvasElement;
        this.loginChart = new Chart(loginsCtx, {
            type: 'line',
            data: loginsData,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        const groupsData = {
            labels: Object.keys(this.graphsData.GroupsCreated),
            datasets: [{
                label: 'Grupos creados',
                data: Object.values(this.graphsData.GroupsCreated),
                borderColor: 'blue',
                fill: false
            }]
        };
        const groupsCtx = document.getElementById('groupsCreated') as HTMLCanvasElement;
        this.groupsChart = new Chart(groupsCtx, {
            type: 'line',
            data: groupsData,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        const listsData = {
            labels: Object.keys(this.graphsData.ListsCreated),
            datasets: [{
                label: 'Listadas creadas',
                data: Object.values(this.graphsData.ListsCreated),
                borderColor: 'blue',
                fill: false
            }]
        };
        const listsCtx = document.getElementById('listsCreated') as HTMLCanvasElement;
        this.listsChart = new Chart(listsCtx, {
            type: 'line',
            data: listsData,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        /* const ctx4 = document.getElementById('elementsCreated') as HTMLCanvasElement;
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
         });*/

    }

    checkDates() {
        if (this.to == "") {
            this.to = new Date().toISOString().substring(0, 10)
        }
        if (this.from == "") {
            this.from = this.to
        }
    }

    updateFrom() {
        this.checkDates()

        let from = new Date(this.from)
        let to = new Date(this.to)

        const minDate = new Date();
        minDate.setDate(to.getDate() - this.maxDateDiffDays);
        this.minDate = minDate.toISOString().substring(0, 10)

        if (from > to || from < minDate) {
            this.from = this.minDate
        }

    }
}
