import { Component } from '@angular/core';
import {LegalsComponent} from "../legals/legals.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [
    LegalsComponent,
    NgbModule
  ],
  templateUrl: './help.component.html',
  styleUrl: './help.component.css'
})
export class HelpComponent {
}
