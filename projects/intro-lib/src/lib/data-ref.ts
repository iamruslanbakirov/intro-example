import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ElementRef, Injector } from '@angular/core';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { ShadowOverlayComponent } from './shadow-overlay.component';
import { DATA_TOKEN } from './di-tokens';

export class DataRef {
  shadowOverlayRef: OverlayRef;

  constructor(
    private overlay: Overlay,
    private injector: Injector,
    public overlayRef: OverlayRef,
    public elementRef: ElementRef,
    public description: string
  ) {
    const config = new OverlayConfig({
      positionStrategy: this.overlay.position().global(),
      scrollStrategy: this.overlay.scrollStrategies.block()
    });

    this.shadowOverlayRef = this.overlay.create(config);

    this.shadowOverlayRef.attach(
      new ComponentPortal(
        ShadowOverlayComponent,
        null,
        new PortalInjector(this.injector, new WeakMap([[DATA_TOKEN, this.elementRef]]))
      )
    );
  }
}
