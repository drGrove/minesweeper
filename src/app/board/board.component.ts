import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StateService } from '../state.service';
import { Board } from '../board';
import { Piece } from '../piece';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Input() board: Board;

  constructor(private _state: StateService) {}

  ngOnInit() {}
}
