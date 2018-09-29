import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { Piece } from '../piece';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.scss']
})
export class PieceComponent implements OnInit {
  @Input() piece: Piece;

  constructor() { }

  ngOnInit() {
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event) {
    switch (event.which) {
      case 1: // Left Click
        this.showValue();
        break;
      case 2: // Middle Click
        break;
      case 3: // Right Click
        this.toggleFlaggingMarking();
        break;
      default:
        console.log('IDK', event.which);
    }
  }

  private showValue() {
    this.piece.isFlagged = false;
    this.piece.marked = false;
    this.piece.revealed = true;
    switch (this.piece.getValue()) {
      case -1:
        this.piece.hitMine = true;
        this.end.emit(true);
        break;
      case 0:
        this.showAround.emit(this.piece);
        break;
      default:
        // Do nothing just show
    }
  }

  show() {
    const value = this.piece.getValue();
    switch (value) {
      case -1:

    }
  }

  private toggleFlaggingMarking () {

  }
}
