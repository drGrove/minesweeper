import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { GameComponent } from './game/game.component';
import { PieceComponent } from './piece/piece.component';
import { LightboxComponent } from './lightbox/lightbox.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    GameComponent,
    PieceComponent,
    LightboxComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
