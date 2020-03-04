import { Directive, HostBinding, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appState]'
})
export class StateDirective implements OnChanges {
  @Input() appState: any;
  @HostBinding('class') classTd: string;
  constructor() {
  }

  ngOnChanges(): void {
    console.log(this.appState)
    this.classTd = this.formatClass(this.appState);
  }

  private formatClass(state: any) {
    return `state-${state.normalize("NFD").replace(/[\u0300-\u036f\s]/g, "").toLowerCase()}`;
  }

}

// appState vaut Annulé => state-annule
// appState vaut Option => state-option
// appState vaut Confirmé => state-confirme
// Binder l'attribut class du host element td avec le bon string
