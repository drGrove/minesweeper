export class Piece {
  private isRevealed = false;
  private value = 0;
  private allowMarks: boolean;
  private isMarked: boolean;
  private isFlagged = false;
  public hitMine = false;
  public thinking = false;

  constructor(allowMarks: boolean) {
    this.allowMarks = allowMarks;
  }

  public isMine(): boolean {
    return this.value < 0;
  }

  public set flagged(flagged: boolean) {
    this.isFlagged = flagged;
    this.marked = false;
  }

  public get flagged(): boolean {
    return this.isFlagged;
  }

  public get isBlank(): boolean {
    return this.value === 0;
  }

  public set revealed(reveal: boolean) {
    this.isRevealed = reveal;
  }

  public set marked(marked: boolean) {
    if (this.allowMarks) {
      this.isMarked = marked;
    }
  }

  public get marked(): boolean {
    return this.isMarked;
  }

  public get revealed() {
    return this.isRevealed;
  }

  public getValue(): number {
    if (this.revealed) {
      return this.value;
    }
    return;
  }

  public addToValue() {
    if (this.value !== -1) {
      this.value++;
    }
  }

  public setMine() {
    this.value = -1;
  }
}
