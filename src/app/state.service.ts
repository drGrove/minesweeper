import { Injectable } from '@angular/core';
import { Game } from './game';
import { SHIFTS, Board, sumArr } from './board';
import { Size } from './size';
import { Piece } from './piece';
import { eqSet } from './utils';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  public game: Game;
  public thinking = false;
  public lastListenedPiece: Piece | null;
  public rightClickDepressed: boolean;
  private board: Board;
  private mines: number;
  private flags: number;
  private revealedPieces: number;
  private nonMinePieces: number;

  constructor() {
  }

  setGame(game: Game) {
    this.board = game.board;
    this.mines = game.mines;
    this.revealedPieces = 0;
    this.flags = 0;
    this.nonMinePieces = (game.size.rows * game.size.cols) - this.mines;
    this.game = game;
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

  incRevealed() {
    this.revealedPieces++;
    if (this.revealedPieces === this.nonMinePieces) {
      alert('You Won!');
    }
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

  showIfAllFlaggedFound(
    piece: Piece,
    pos: number[],
    minesSeen = new Set<Piece>(),
    minesFlagged = new Set<Piece>(),
    piecesToReveal = new Set<Array<(Piece|number[])>> ()
  ) {
    const board: Piece[][] = this.board.board;
    for (const shift of SHIFTS) {
      const shiftPos: number[] = sumArr(pos, shift);
      if ((shiftPos[0] < 0) || (shiftPos[0] >= this.board.size.rows) ||
          (shiftPos[1] < 0) || (shiftPos[1] >= this.board.size.cols)
      ) {
        continue;
      }
      const p: Piece = board[shiftPos[0]][shiftPos[1]];
      if (p.revealed) { continue; }
      if (p.isBlank) {
        this.showAround(p, shiftPos);
      }
      if (p.isMine()) {
        minesSeen.add(p);
        if (p.flagged) {
          minesFlagged.add(p);
        }
        continue;
      }
      if (!p.flagged && !p.isMine() && !p.revealed) {
        piecesToReveal.add([piece, [shiftPos[0], shiftPos[1]]]);
      }
    }

    if (eqSet(minesSeen, minesFlagged)) {
      for (const [rp, rp_pos] of  piecesToReveal) {
        (<Piece>rp).revealed = true;
        this.incRevealed();
        board[(<number>rp_pos[0])][(<number>rp_pos[1])] = (<Piece>rp);
      }
    }
  }

  showAround(piece: Piece, pos: number[], seen = new Set<string>()) {
    const board: Piece[][] = this.board.board;
    if (!piece.isBlank) { return; }
    seen.add(`${pos[0]}_${pos[1]}`);
    for (const shift of SHIFTS) {
      const shiftPos: number[] = sumArr(pos, shift);
      if ((shiftPos[0] < 0) || (shiftPos[0] >= this.board.size.rows) ||
          (shiftPos[1] < 0) || (shiftPos[1] >= this.board.size.cols)
      ) {
        continue;
      }
      if (seen.has(`${shiftPos[0]}_${shiftPos[1]}`)) {
        continue;
      }
      const p: Piece = board[shiftPos[0]][shiftPos[1]];
      if (p.isBlank) {
        this.showAround(p, shiftPos, seen);
      }
      if (!p.flagged && !p.isMine() && !p.revealed) {
        p.revealed = true;
        this.incRevealed();
      }
      board[shiftPos[0]][shiftPos[1]] = p;
    }
  }
}
