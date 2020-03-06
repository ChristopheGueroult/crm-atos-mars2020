import { Component, OnInit } from '@angular/core';
import { PrestationsService } from '../../services/prestations.service';
import { Prestation } from 'src/app/shared/models/prestation';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { State } from 'src/app/shared/enums/state.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { faTrashAlt, faAlignCenter } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-page-prestations',
  templateUrl: './page-prestations.component.html',
  styleUrls: ['./page-prestations.component.scss']
})
export class PagePrestationsComponent implements OnInit {
  public faTrashAlt = faTrashAlt;
  public faAlignCenter = faAlignCenter;
  public collection$ = new Subject<Prestation[]>();
  public headers: string[];
  public title: string;
  public subtitle: string;
  public label: string;
  public route: string;
  public externalLink: string;
  public states = Object.values(State);
  public listLinks: {route: string, label: string}[];
  // public states = State; // need to use pipe keyvalue
  constructor(
    private ps: PrestationsService,
    private acRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listLinks = [
      {route: 'details', label: 'détails'},
      {route: 'comments', label: 'commentaires'},
    ];
    this.ps.collection.subscribe((datas) => {
      this.collection$.next(datas);
    });
    this.acRoute.data.subscribe((datas) => {
      // console.log(datas);
      this.title = datas.title;
      this.subtitle = datas.subtitle;
    })
    this.label = 'Ajouter une prestation';
    this.route = 'add';
    this.externalLink = 'https://www.google.fr';
    this.headers = [
      'Type',
      'Client',
      'NbJours',
      'TjmHT',
      'Total HT',
      'Total TTC',
      'State',
      'Delete',
      'Details'
    ]
  }

  public changeState(item: Prestation, event) {
    this.ps.updateState(item, event.target.value).subscribe((res: Prestation) => {
      item.state = res.state;
    });
  }

  public delete(itemNikki: Prestation) {
    this.ps.delete(itemNikki).subscribe((res: Prestation) => {
      // traiter reponse api
      console.log(res);
      this.ps.collection.subscribe((datas) => {
        this.collection$.next(datas);
      });
    });
  }

  public edit(item: Prestation) {
    this.router.navigate(['prestations','edit', item.id]);
  }

  public details(item: Prestation) {
    this.ps.setDetails(item);
  }

}
