import { Component, OnInit } from '@angular/core';
import { Prestation } from 'src/app/shared/models/prestation';
import { PrestationsService } from '../../services/prestations.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-add-prestation',
  templateUrl: './page-add-prestation.component.html',
  styleUrls: ['./page-add-prestation.component.scss']
})
export class PageAddPrestationComponent implements OnInit {
  public title: string;
  public subtitle: string;
  constructor(
    private ps: PrestationsService,
    private router: Router,
    private acRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.acRoute.data.subscribe((datas) => {
      // console.log(datas);
      this.title = datas.title;
      this.subtitle = datas.subtitle;
    })
  }

  public addItem(item: any) {
    // console.log(item);
    this.ps.add(item).subscribe((res) => {
      // redirection avec navigate classic
      // this.router.navigate(['prestations']);
      // example relative redirect
      this.router.navigate(['../'], {relativeTo: this.acRoute});
    });
  }

}
