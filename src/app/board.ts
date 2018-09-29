import { Piece } from './piece';
import { Size } from './size';

export class Board {
  public board: Piece[][];
  public mines = 0;
  public flags = 0;
  public size: Size;
  private allowMarks: boolean;

  constructor(size: Size, numMines: number, marks: boolean) {
    let board: Piece[][] = [];
    let mines: Set<string>;
    this.mines = numMines;
    this.size = size;
    this.allowMarks = marks;
    const minesPlaced = 0;
    for (let row = 0; row < this.size.rows; row++) {
      board[row] = [];
      for (let col = 0; col < this.size.cols; col++) {
        board[row][col] = new Piece(this.allowMarks);
      }
    }
    board = Object.seal(board);
    ({ board, mines} = this.setMines(board, numMines));
    board = this.setValuesAroundMines(board, mines, this.size);
    this.board = board;
  }

  private setMines(
    board: Piece[][],
    mines: number
  ): { board: Piece[][], mines: Set<string> } {
    const positions = genPositions(mines, this.size.rows, this.size.cols);
    const positionIterator = positions.keys();
    let position = positionIterator.next();
    do {
      const pos = convertToNumberArray(position.value.split('_'));
      const piece: Piece = board[pos[0]][pos[1]];
      piece.setMine();
      board[pos[0]][pos[1]] =  piece;
      position = positionIterator.next();
    } while (!position.done);
    return { board, mines: positions };
  }

  private setValuesAroundMines(
    board: Piece[][],
    minePositions: Set<string>,
    size: Size
  ): Piece[][] {
    const positionIterator = minePositions.keys();
    let position = positionIterator.next();
    do {
      const pos: number[] = convertToNumberArray(position.value.split('_'));
      const mine: Piece = board[pos[0]][pos[1]];
      const shifts: number[][] = Object.seal([
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1]
      ]);
      for (const shift of shifts) {
        const shiftPos: number[] = sumArr(pos, shift);
        if ((shiftPos[0] < 0) || (shiftPos[0] >= size.rows) ||
            (shiftPos[1] < 0) || (shiftPos[1] >= size.cols)
        ) {
          continue;
        }
        const piece: Piece = board[shiftPos[0]][shiftPos[1]];
        piece.addToValue();
        board[shiftPos[0]][shiftPos[1]] = piece;

      }
      position = positionIterator.next();
    } while (!position.done);
    return board;
  }
}

function convertToNumberArray(arr: string[]): number[] {
  const numArr: number[] = [];
  for (let i = arr.length; i--;) {
    numArr[i] = +arr[i]; // Shortcut to convert to int
  }
  return Object.seal(numArr);
}

function sumArr(arr1: number[], arr2: number[]): number[] {
  return arr1.map( (num, idx) => {
    return num + arr2[idx];
  });
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
