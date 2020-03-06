import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Prestation } from 'src/app/shared/models/prestation';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { State } from 'src/app/shared/enums/state.enum';

@Injectable({
  providedIn: 'root'
})
export class PrestationsService {
  private pCollection$: Observable<Prestation[]>;
  public itemDetail$ = new BehaviorSubject<Prestation>(null);
  constructor(private http: HttpClient) {
    this.collection = this.http.get<Prestation[]>(`${environment.urlApi}prestations`).pipe(
      // map(tab => tab.map(objJson => new Prestation(objJson) ) )
      map((tab) => {
        this.itemDetail$.next(tab[0]);
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
  public add(item: any) {
    return this.http.post<Prestation>(`${environment.urlApi}prestations`, item);
  }

  // update state
  public updateState(item: Prestation, state: State): Observable<Prestation> {
    let obj = new Prestation(item);
    obj.state = state;
    return this.update(obj);
  }

  // update item in collection
  public update(item: Prestation): Observable<Prestation> {
    return this.http.patch<Prestation>(`${environment.urlApi}prestations/${item.id}`, item);
  }

  // delete item in collection
  public delete(item: Prestation): Observable<Prestation> {
    return this.http.delete<Prestation>(`${environment.urlApi}prestations/${item.id}`);
  }

  // get item by id from collection
  public getItemById(id: string) {
    return this.http.get<Prestation>(`${environment.urlApi}prestations/${id}`);
  }

  // update details prestation
  public setDetails(item: Prestation) {
    this.itemDetail$.next(item);
  }
}
