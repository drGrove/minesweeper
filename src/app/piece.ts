export class Piece {
  private isRevealed = false;
  private value = 0;

  public isFlagged = false;

  constructor() {}

  public isMine(): boolean {
    return this.value < 0;
  }

  public set revealed(reveal: boolean) {
    this.isRevealed = reveal;
  }

  public get revealed() {
    return this.isRevealed;
  }

  public getValue(): number {
    return this.value;
  }

  public addToValue(value: number) {
    this.value += value;
  }

  public setMine() {
    this.value = -1;
  }
}
