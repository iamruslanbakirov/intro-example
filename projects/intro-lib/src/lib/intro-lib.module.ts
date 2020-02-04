import { NgModule } from '@angular/core';
import { IntroLibComponent } from './intro-lib.component';
import { IntroTriggerDirective } from './intro-trigger.directive';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatCardModule } from '@angular/material/card';
import { ShadowOverlayComponent } from './shadow-overlay.component';

@NgModule({
  declarations: [IntroLibComponent, IntroTriggerDirective, ShadowOverlayComponent],
  entryComponents: [IntroLibComponent, ShadowOverlayComponent],
  imports: [OverlayModule, MatCardModule],
  exports: [IntroLibComponent, IntroTriggerDirective, ShadowOverlayComponent]
})
export class IntroLibModule {}
