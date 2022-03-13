import { HttpClient  } from '@angular/common/http';
import { Injectable  } from '@angular/core';
import { Observable  } from 'rxjs';
import { PaisesSmall } from '../interface/paises';

@Injectable({
  providedIn: 'root'
})
export class PaisesServiceService {
  private _urlDb : string= `https://restcountries.com/v3.1`
  private _regiones:string[] = [
    'Africa',
    'Europe',
    'Asia',
    'Americas',
    'Oceania'
  ]
  /* Se crea un getter que retorna el arreglo 
  haciendo una destructuracion para evitar modificar el arreglo  original*/
  get regiones():string[]{
    return [...this._regiones]
  }
  constructor(private http: HttpClient) { }

  getPaisesPorRegion(region:string):Observable<PaisesSmall[]>{
    const url = `${this._urlDb}/region/${region}?fields=cca3,name`
    return this.http.get<PaisesSmall[]>( url)
  }
}
