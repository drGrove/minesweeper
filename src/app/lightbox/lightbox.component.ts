import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { StateService } from '../state.service';
import { Options } from '../options';
import { Size } from '../size';
import { Game } from '../game';

@Component({
  selector: 'app-lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.scss']
})
export class LightboxComponent implements OnInit {
  @Output() showChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() state: string;
  @Output() startNewGame: EventEmitter<Options> = new EventEmitter<Options>();
  private gameForm: FormGroup;
  private shouldShow: boolean;
  private options = [
    ['Beginner', new Options(new Size(9, 9), 10)],
    ['Intermediate', new Options(new Size(16, 16), 40)],
    ['Expert', new Options(new Size(16, 30), 99)]
  ];
  private setMark: boolean;

  constructor (private _state: StateService, private fb: FormBuilder) { }

  ngOnInit() {
    this.gameForm = this.fb.group({
      selectedOption: 'Beginner',
      setMark: false,
      rows: 20,
      cols: 30,
      mines: 145
    });
  }

  @Input()
  get show() {
    return this.shouldShow;
  }

  set show(val: boolean) {
    this.shouldShow = val;
    this.showChange.emit(this.shouldShow);
  }

  newGame() {
    let options;
    const values = this.gameForm.value;
    switch (values.selectedOption) {
      case 'Custom':
        options = new Options(new Size(values.rows, values.cols), values.mines);
        break;
      default:
        options = this.options.filter((item) => {
          return item[0] === this.gameForm.value.selectedOption;
        })[0][1];
    }
    this.startNewGame.emit(options);
    this.close();
  }

  close() {
    this.show = false;
  }
}
