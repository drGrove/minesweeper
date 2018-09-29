import { Component, OnInit, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { Board } from '../board';
import { Piece } from '../piece';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Input() board: Board;
  @Output() end: EventEmitter<boolean> = new EventEmitter<boolean>();
  public ended: boolean;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    console.log(this.board);
  }

  setEnd(event: boolean) {
    this.ended = event;
    this.end.emit(event);
  }

  showAround(event: Piece) {
    console.log('Show some stuff');
  }
}
