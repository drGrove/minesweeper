import { Piece } from './piece';

export class Size {
  public rows = 0;
  public cols = 0;

  constructor(rows: number, cols: number) {
    this.rows = rows;
    this.cols = cols;
  }
}


export class Board {
  public board: Piece[][];
  public mines = 0;
  public flags = 0;
  public size: Size;

  constructor(size: Size, numMines: number) {
    let board: Piece[][] = [];
    this.mines = numMines;
    this.size = size;
    const minesPlaced = 0;
    for (let row = 0; row < this.size.rows; row++) {
      board[row] = [];
      for (let col = 0; col < this.size.cols; col++) {
        board[row][col] = new Piece();
      }
    }
    board = Object.seal(board);
    board = this.setMines(board, numMines);
    board = this.setValuesAroundMines(board);
    this.board = board;
  }

  private setMines(board: Piece[][], mines: number): Piece[][] {
    const positions = genPositions(mines, this.size.rows, this.size.cols);
    const positionIterator = positions.keys();
    let position = positionIterator.next();
    do {
      const pos = position.value.split('_');
      const piece: Piece = board[pos[0]][pos[1]];
      piece.setMine();
      board[pos[0]][pos[1]] =  piece;
      position = positionIterator.next();
    } while (!position.done);
    return board;
  }

  private setValuesAroundMines(board: Piece[][]): Piece[][] {
    return board;
  }
}

function genRandomNumber(max: number) {
  return Math.floor(Math.random() * max);
}

function genPositions(
  numPositions: number,
  num1Max: number,
  num2Max: number
): Set<string> {
  const positions = new Set<string>();
  let count = 0;
  while (count < numPositions) {
    const position = `${genRandomNumber(num1Max)}_${genRandomNumber(num2Max)}`;
    if (!positions.has(position)) {
      positions.add(position);
      count++;
    }
  }
  return positions;
}
