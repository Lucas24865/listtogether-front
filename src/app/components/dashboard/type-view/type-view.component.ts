import { AfterViewInit, Component, ElementRef } from '@angular/core';
import Masonry from 'masonry-layout';

@Component({
  selector: 'app-type-view',
  standalone: true,
  imports: [],
  templateUrl: './type-view.component.html',
  styleUrl: './type-view.component.css'
})
export class TypeViewComponent implements AfterViewInit {
  constructor(private elementRef: ElementRef) {}
  ngAfterViewInit(): void {
    const grid = new Masonry(this.elementRef.nativeElement.querySelector('.mansory'), {
      // Opciones de Masonry si es necesario
      itemSelector: '.col-xs-12', // Selector de los elementos de la mampostería
      // Otras opciones de configuración de Masonry si es necesario
    });
  }
}
