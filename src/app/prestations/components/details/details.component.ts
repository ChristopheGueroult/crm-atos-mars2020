import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Prestation } from 'src/app/shared/models/prestation';
import { PrestationsService } from '../../services/prestations.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  public item$: Subject<Prestation>;
  constructor(
    private ps: PrestationsService
  ) { }

  ngOnInit(): void {
    this.item$ = this.ps.itemDetail$;
  }

}
