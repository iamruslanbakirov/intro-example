import { Component, Inject, OnInit } from '@angular/core';
import { DATA_TOKEN } from './di-tokens';
import { DataRef } from './data-ref';

@Component({
  selector: 'lib-intro-lib',
  template: `
    <mat-card>
      <mat-card-content> {{ data.description }}</mat-card-content>
    </mat-card>
  `,
  styles: ['mat-card {width: 300px; margin: 32px;}']
})
export class IntroLibComponent implements OnInit {
  constructor(@Inject(DATA_TOKEN) public data: DataRef) {}

  ngOnInit() {}
}
