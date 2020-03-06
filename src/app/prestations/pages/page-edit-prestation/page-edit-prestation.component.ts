import { Component, OnInit } from '@angular/core';
import { PrestationsService } from '../../services/prestations.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { Prestation } from 'src/app/shared/models/prestation';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-page-edit-prestation',
  templateUrl: './page-edit-prestation.component.html',
  styleUrls: ['./page-edit-prestation.component.scss']
})
export class PageEditPrestationComponent implements OnInit {

  public title: string;
  public subtitle: string;
  // public itemId: string;
  public item$: Observable<Prestation>;
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
    });


    // this.acRoute.paramMap.subscribe((params) => {
    //   console.log(params.get('id'));
    //   this.item$ = this.ps.getItemById(params.get('id'));
    // });

    this.item$ = this.acRoute.paramMap.pipe(
      switchMap((params: ParamMap) => {
        // this.itemId = params.get('id');
        return this.ps.getItemById(params.get('id'))
      })
    );

  }

  public updateItem(item: any) {
    // item.id = this.itemId;
    console.log(item);
    this.ps.update(item).subscribe((res) => {
      this.router.navigate(['../../'], {relativeTo: this.acRoute});
    })
  }

}
