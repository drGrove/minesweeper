import { Component, OnInit, ElementRef } from '@angular/core';
import { StateService } from '../state.service';
import { Game } from '../game';
import { Size } from '../size';
import { Options } from '../options';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  private options: Options = new Options();
  public game: Game;
  private showLightbox = false;
  private lightboxState: string;

  constructor(
    private _state: StateService,
    private _el: ElementRef
  ) {}

  ngOnInit() {
    this.newGame();
  }

  newGame(options: Options = new Options()) {
    this.options = options;
    this.game = new Game(options.size, options.mines, options.marks);
    this._state.setGame(this.game);
    this._el.nativeElement.style.setProperty('--board-width', `${this.game.size.rows * 56.45}px`);
  }

  showFace() {
    if (this._state.thinking) {
      return '🤔';
    }
    if (!this.game.started) {
      return '🙂';
    }
    if (this.game.started && !this.game.ended) {
      return '🙂';
    }
    if (this.game.ended && !this.game.win) {
      return '😭';
    }
    if (this.game.ended && this.game.win) {
      return'😎';
    }
  }

  showMenu(state: string) {
    this.showLightbox = true;
    this.lightboxState = state;
  }
}
