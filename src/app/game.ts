import { Board, Size } from './board';

export class Game {
  public time = 0;
  private interval;
  public board: Board;

  constructor(size: Size = new Size(16, 30), mines: number = 99) {
    this.board = new Board(size, mines);
  }

  public static new(size: Size, mines: number): Game {
    return new Game(size);
  }

  start() {
    this.interval = setInterval(this.time++, 1000);
  }
}
