import { HttpClient  } from '@angular/common/http';
import { Injectable  } from '@angular/core';
import { Observable, of  } from 'rxjs';
import { Pais, PaisesSmall } from '../interface/paises';

@Injectable({
  providedIn: 'root'
})
export class PaisesServiceService {
  private _urlDb : string= `https://restcountries.com/v3.1`
  private _urlDbv2 : string= `https://restcountries.com/v2`
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
  getPaisPorCodigo(codigo:string):Observable<Pais[]> {
    //Forma de Validacion si viene un string vacio en la respuesta 
    if(!codigo){
      // con of() se retorna un obsevable que tiene como resultado un null
      return of ([])
    }
    // UrlV2 dentro del retorno de tipo Pais[] se elimina el simbolo de array 
    /*const url = `${this._urlDbv2}/alpha/${codigo}`;
    return this.http.get<Pais>(url);*/
    // Url V3
    const url = `${this._urlDb}/alpha/${codigo}`;
    return this.http.get<Pais[]>(url);

  }
}
