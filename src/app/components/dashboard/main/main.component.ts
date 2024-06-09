import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../../navbar/navbar.component";
import {DashboardComponent} from "../dashboard/dashboard.component";

@Component({
    selector: 'app-main',
    standalone: true,
    templateUrl: './main.component.html',
    styleUrl: './main.component.css',
    imports: [NavbarComponent, DashboardComponent]
})
export class MainComponent implements OnInit {
    isViewGroup: boolean = true;

    ngOnInit(): void {
        this.isViewGroup = true;
    }

    changeView() {
        this.isViewGroup = !this.isViewGroup
    }

}
