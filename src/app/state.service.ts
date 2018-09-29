import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Game } from './game';
import { Board } from './board';
import { Piece } from './piece';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  public game: Game;
  private board: Board;

  constructor() {

  }

  setGame(game: Game) {
    this.game = game;
    this.board = game.board;
  }

  isEnded() {
    return this.game.ended;
  }

  setEnded() {
    this.game.ended = true;
  }

  setStarted() {
    this.game.started = true;
  }

  started() {
    return this.game.started;
  }

  showAround(piece: Piece) {

  }
}
