import {
  Directive,
  Output,
  EventEmitter,
  HostListener
} from "@angular/core";

@Directive({
  selector: "[appLookUp]"
})
export class LookUpDirective {
  @Output() onChangeButtonCondition = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {}

  @HostListener("mouseover") mouseover(eventData: Event) {
    this.onChangeButtonCondition.emit(true);
  }

  @HostListener("mouseleave") mouseleave(eventData: Event) {
    this.onChangeButtonCondition.emit(false);
  }
}
