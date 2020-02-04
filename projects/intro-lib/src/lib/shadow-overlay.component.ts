import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { DATA_TOKEN } from './di-tokens';

@Component({
  selector: 'lib-shadow-overlay',
  template: `
    <canvas #canvasElement></canvas>
  `,
  styleUrls: ['./shadow-overlay.component.css']
})
export class ShadowOverlayComponent implements OnInit {
  maxSize = 300;
  rem = 16;
  @ViewChild('canvasElement', { static: true }) canvasElement: ElementRef<HTMLCanvasElement>;

  constructor(@Inject(DATA_TOKEN) public elementRef: ElementRef) {}

  ngOnInit() {
    const { nativeElement: canvas }: { nativeElement: HTMLCanvasElement } = this.canvasElement;

    const context: CanvasRenderingContext2D = canvas.getContext('2d');

    canvas.width = document.body.offsetWidth;
    canvas.height = document.body.offsetHeight > window.innerHeight ? document.body.offsetHeight : window.innerHeight;
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#0000';
    canvas.style.opacity = '1';

    const { width, height, x, y } = this.elementRef.nativeElement.getBoundingClientRect() as DOMRect;
    const radius = (width > height ? width : height) / 2 + this.rem;

    const xCenter = x + width / 2;
    const yCenter = y + height / 2;

    if ((width > height ? width : height) > this.maxSize) {
      context.rect(x - this.rem, y - this.rem, width + this.rem * 2, height + this.rem * 2);
    } else {
      context.arc(xCenter, yCenter, radius, 0, 2 * Math.PI);
    }

    context.fillStyle = '#00000052';
    context.fill('evenodd');
  }
}
