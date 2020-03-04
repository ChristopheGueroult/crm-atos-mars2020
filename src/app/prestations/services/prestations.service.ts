import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Prestation } from 'src/app/shared/models/prestation';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrestationsService {
  private pCollection$: Observable<Prestation[]>;
  constructor(private http: HttpClient) {
    this.collection = this.http.get<Prestation[]>(`${environment.urlApi}prestations`).pipe(
      // map(tab => tab.map(objJson => new Prestation(objJson) ) )
      map((tab) => {
        return tab.map((objJson) => {
          return new Prestation(objJson);
        })
      })
    );
  }

  // get collection
  public get collection(): Observable<Prestation[]> {
    return this.pCollection$;
  }

  // set collection
  public set collection(col: Observable<Prestation[]>) {
    this.pCollection$ = col;
  }

  // add item in collection

  // update item in collection

  // delete item in collection

  // get item by id from collection
}
