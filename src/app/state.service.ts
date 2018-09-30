import { Injectable } from '@angular/core';
import { Game } from './game';
import { Board } from './board';
import { Piece } from './piece';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  public game: Game;
  private board: Board;
  private mines: number;
  private flags: number;
  private revealedPieces: number;
  private nonMinePieces: number;

  constructor() {
  }

  setGame(game: Game) {
    this.game = game;
    this.board = game.board;
    this.mines = this.game.mines;
    this.revealedPieces = 0;
    this.flags = 0;
    this.nonMinePieces = (this.game.size.rows * this.game.size.cols) - this.mines;
  }

  get mineCounter(): number {
    return this.mines - this.flags;
  }

  addToFlags(num: number) {
    this.flags += num;
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

  showAround(piece: Piece, coords: number[]) {
    console.log(piece, coords);
  }
}
