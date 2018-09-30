import { Size } from './size';
export class Options {
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
