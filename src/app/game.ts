import { Board } from './board';
import { Size } from './size';

export class Game {
  public time = 0;
  private interval;
  public board: Board;
  public size: Size;
  public mines: number;
  public win: boolean;
  public thinking: boolean;
  private isEnded = false;
  private isStarted = false;

  constructor(size: Size, mines: number, marks: boolean) {
    this.board = new Board(size, mines, marks);
    this.size = size;
    this.mines = mines;
  }

  public static new(size: Size, mines: number, marks: boolean): Game {
    return new Game(size, mines, marks);
  }

  set ended(ended: boolean) {
    this.isEnded = ended;
    if (ended) {
      clearInterval(this.interval);
    }
  }

  get ended(): boolean {
    return this.isEnded;
  }

  set started(start: boolean) {
    if (!this.isStarted) {
      this.isStarted = start;
      this.time = 1;
      this.interval = setInterval(() => {
        this.time++;
      }, 1000);
    }
  }

  get started(): boolean {
    return this.isStarted;
  }
}
