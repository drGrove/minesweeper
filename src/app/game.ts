import { Board } from './board';
import { Size } from './size';

export class Game {
  public time = 0;
  private interval;
  public board: Board;

  constructor(size: Size, mines: number, marks: boolean) {
    this.board = new Board(size, mines, marks);
  }

  public static new(size: Size, mines: number, marks: boolean): Game {
    return new Game(size, mines, marks);
  }

  start() {
    this.interval = setInterval(this.time++, 1000);
  }
}
