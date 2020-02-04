import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { IntroLibService } from './intro-lib.service';

@Directive({
  selector: '[libIntroTrigger]'
})
export class IntroTriggerDirective {
  @Input() libIntroTrigger: string;

  constructor(private introLibService: IntroLibService, private elementRef: ElementRef) {}

  @HostListener('click') showGuideMessage(): void {
    this.introLibService.show$.emit([this.libIntroTrigger, this.elementRef]);
  }
}
