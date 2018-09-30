import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { Game } from '../game';
import { Size } from '../size';

class Options {
  public size: Size;
  public mines: number;
  public marks: boolean;

  constructor(
    size: Size = new Size(16, 30),
    mines: number = 99,
    marks: boolean = false
  ) {
    this.size = size;
    this.mines = mines;
    this.marks = marks;
  }
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  private options: Options = new Options();
  public game: Game;

  constructor(private _state: StateService) {
    this.newGame();
  }

  ngOnInit() { }

  newGame(options: Options = new Options()) {
    this.game = new Game(options.size, options.mines, options.marks);
    this._state.setGame(this.game);
  }

  showFace() {
    if (this._state.thinking) {
      return '🤔';
    }
    if (!this.game.started) {
      return '🙂';
    }
    if (this.game.started && !this.game.ended && !this.game.thinking) {
      return '🙂';
    }
    if (this.game.ended && !this.game.win) {
      return '😭';
    }
    if (this.game.ended && this.game.win) {
      return'😎';
    }
  }
}
