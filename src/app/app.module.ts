import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { IntroLibModule } from 'intro-lib';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IntroLibModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
