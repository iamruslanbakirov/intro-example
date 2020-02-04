import { ElementRef, EventEmitter, Injectable, Injector, NgZone } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { DataRef } from './data-ref';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { DATA_TOKEN } from './di-tokens';
import { takeWhile } from 'rxjs/operators';
import { IntroLibComponent } from './intro-lib.component';

@Injectable({
  providedIn: 'root'
})
export class IntroLibService {
  private overlayRef: OverlayRef;
  show$ = new EventEmitter<[string, ElementRef]>();

  constructor(private readonly overlay: Overlay, private readonly ngZone: NgZone, private readonly injector: Injector) {
    this.show$.subscribe(([description, elementRef]: [string, ElementRef]) => {
      this.attach(elementRef, description);
    });
  }

  attach(elementRef: ElementRef, description: string): void {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.dispose();
    }

    this.overlayRef = this.createOverlay(elementRef);

    const dataRef = this.ngZone.run(
      () => new DataRef(this.overlay, this.injector, this.overlayRef, elementRef, description)
    );

    const injector = new PortalInjector(this.injector, new WeakMap([[DATA_TOKEN, dataRef]]));

    dataRef.overlayRef.attach(new ComponentPortal(IntroLibComponent, null, injector));
  }

  createOverlay(elementRef: ElementRef): OverlayRef {
    const config = new OverlayConfig({
      positionStrategy: this.getPositionStrategy(elementRef),
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    });

    return this.overlay.create(config);
  }

  private getPositionStrategy(elementRef: ElementRef): PositionStrategy {
    return this.overlay
      .position()
      .flexibleConnectedTo(elementRef)
      .withFlexibleDimensions(false)
      .withViewportMargin(8)
      .withGrowAfterOpen(true)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top'
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom'
        },
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top'
        },
        {
          originX: 'end',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'bottom'
        }
      ]);
  }
}
