export class Piece {
  private isRevealed = false;
  private value = 0;
  private allowMarks: boolean;
  private marked: boolean;
  public isFlagged = false;

  constructor(allowMarks: boolean) {
    this.allowMarks = allowMarks;
  }

  public isMine(): boolean {
    return this.value < 0;
  }

  public set revealed(reveal: boolean) {
    this.isRevealed = reveal;
  }

  public set isMarked(marked: boolean) {
    if (this.allowMarks) {
      this.marked = marked;
    }
  }

  public get isMarked(): boolean {
    return this.marked;
  }

  public get revealed() {
    return this.isRevealed;
  }

  public getValue(): number {
    if (this.revealed) {
      return this.value;
    }
    throw new Error('Cannot get value for item not revealed');
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
