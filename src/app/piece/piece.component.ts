import { Component, OnInit, Input } from '@angular/core';
import { Piece } from '../piece';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.scss']
})
export class PieceComponent implements OnInit {
  @Input() piece: Piece;

  constructor() { }

  ngOnInit() {
  }

}
