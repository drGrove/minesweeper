import { Component, HostListener } from '@angular/core';
import { StateService } from './state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Minesweeper';

  constructor(private _state: StateService) {}

  @HostListener('window:mouseup', ['$event.target'])
  onWndowMouseUp(target) {
    if (this._state.lastListenedPiece) {
      this._state.lastListenedPiece.thinking = false;
      this._state.lastListenedPiece = null;
    }
  }


}
