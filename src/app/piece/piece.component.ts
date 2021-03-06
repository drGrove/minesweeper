import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { StateService } from '../state.service';
import { Piece } from '../piece';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.scss']
})
export class PieceComponent implements OnInit {
  @Input() piece: Piece;
  @Input() positionX: number;
  @Input() positionY: number;

  constructor(
    private _state: StateService,
  ) { }

  ngOnInit() {
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event) {
    this._state.thinking = true;
    this.piece.thinking = true;
    this._state.rightClickDepressed = event.which === 3;
    this._state.lastListenedPiece = this.piece;
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event) {
    this._state.rightClickDepressed = false;
    this._state.thinking = false;
    this.piece.thinking = false;
    switch (event.which) {
      case 1: // Left Click
        this.showValue();
        break;
      case 2: // Middle Click
        if (!this.piece.revealed) { return false; }
        this._state.showIfAllFlaggedFound(this.piece, [this.positionX, this.positionY]);
        break;
      case 3: // Right Click
        this.toggleFlaggingMarking();
        break;
      default:
        // Do nothing
    }
  }

  private showValue() {
    this._state.setStarted();
    if (this.piece.flagged || this.piece.marked) {
      return;
    }
    this.piece.revealed = true;
    switch (this.piece.getValue()) {
      case -1:
        this.piece.hitMine = true;
        this._state.setEnded();
        break;
      case 0:
        this._state.showAround(this.piece, [this.positionX, this.positionY]);
        break;
      default:
        // Do nothing just show
    }
  }

  show(valueType: string) {
    switch (valueType) {
      case 'value':
        if (!this.piece.revealed) { return false; }
        return this.piece.getValue() > 0;
      case 'mine':
        if (this._state.isEnded() && this.piece.isMine() && !this.piece.flagged) { return true; }
        return this.piece.getValue() === -1 && !this.piece.marked && !this.piece.flagged;
      case 'wrongFlag':
        return this._state.isEnded() && !this.piece.isMine() && this.piece.flagged && !this.piece.revealed;
      case 'flag':
        return this.piece.flagged && !this.piece.revealed;
            case 'mark':
        return this.piece.marked && !this.piece.revealed;
      default:
        return false;
    }
  }

  private toggleFlaggingMarking () {
    if (!this.piece.flagged && !this.piece.marked) {
      this.piece.flagged = true;
      this._state.addToFlags(1);
      return;
    }

    if (this.piece.flagged) {
      this.piece.flagged = false;
      this._state.addToFlags(-1);
      this.piece.marked = true;
      return;
    }

    if (this.piece.marked) {
      this.piece.marked = false;
      return;
    }
  }
}
