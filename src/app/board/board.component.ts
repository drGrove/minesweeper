import { Component, OnInit, OnChanges, Input, ElementRef } from '@angular/core';
import { Board } from '../board';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnChanges {
  @Input() board: Board;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    console.log(this.board);
  }

  ngOnChanges() {
    const htmlStyles = window.getComputedStyle(document.querySelector('app-board'));
    const rowNum = parseInt(htmlStyles.getPropertyValue('--rowNum'), 10);
    const colNum = parseInt(htmlStyles.getPropertyValue('--colNum'), 10);
    this.elementRef.nativeElement.style.setProperty('--rowNum', this.board.size.rows);
    this.elementRef.nativeElement.style.setProperty('--colNum', this.board.size.cols);
  }
}
