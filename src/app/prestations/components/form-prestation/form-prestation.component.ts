import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { State } from 'src/app/shared/enums/state.enum';
import { Prestation } from 'src/app/shared/models/prestation';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-prestation',
  templateUrl: './form-prestation.component.html',
  styleUrls: ['./form-prestation.component.scss']
})
export class FormPrestationComponent implements OnInit {
  public states = Object.values(State);
  @Output() nItem: EventEmitter<Prestation> = new EventEmitter();
  @Input() itemNikki = new Prestation();
  public form: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      typePresta: [
        this.itemNikki.typePresta,
        Validators.required
      ],
      client: [
        this.itemNikki.client,
        Validators.compose([Validators.required, Validators.minLength(2)])
      ],
      tjmHt: [this.itemNikki.tjmHt],
      nbJours: [this.itemNikki.nbJours],
      tva: [this.itemNikki.tva],
      state: [this.itemNikki.state],
      comment: [this.itemNikki.comment]
    });
  }

  public onSubmit() {
    // console.log(this.form.value);
    this.nItem.emit(this.form.value)
  }

}
