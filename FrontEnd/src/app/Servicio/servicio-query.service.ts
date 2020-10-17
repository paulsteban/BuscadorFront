import { Injectable } from '@angular/core';
import { InterfazQuery } from "../Interfaz/Interfaz-query";
import { Observable } from "rxjs/internal/Observable";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ServicioQueryService {
  nombreModelo = "Buscador";
  constructor(private readonly _httpClient: HttpClient) { }

  create(objetoGuardar:InterfazQuery): Observable<InterfazQuery> {

    const url = environment.url;

    console.log(objetoGuardar)

    return this._httpClient
      .post(url, objetoGuardar)
      .pipe(map(r => <InterfazQuery>r)); // Castear
  }

  obtenerPalabrasRepetidas( objetoAGuardar: any): Observable<InterfazQuery> {

    const url = environment.url+'obtenerPalabrasRepetidas';

    return this._httpClient
      .post(url, objetoAGuardar)
      .pipe(map(r => <InterfazQuery>r)); // Castear
  }

  obtenerNYT(query: string, estado: string, palabrasclaves: string[]): Observable<InterfazQuery> {

    const objetoAGuardar = {
      query: query,
      estado: estado,
      palabrasClave: palabrasclaves

    };

    const url = environment.url+'nyt';


    console.log(objetoAGuardar)

    return this._httpClient
      .post(url, objetoAGuardar)
      .pipe(map(r => <InterfazQuery>r)); // Castear
  }

  obtenerComercio(query: string, estado: string, palabrasclaves: string[]): Observable<InterfazQuery> {

    const objetoAGuardar = {
      query: query,
      estado: estado,
      palabrasClave: palabrasclaves

    };

    const url = environment.url+'comercio';


    console.log(objetoAGuardar)

    return this._httpClient
      .post(url, objetoAGuardar)
      .pipe(map(r => <InterfazQuery>r)); // Castear
  }
  obtenerDoaj(query: string, estado: string, palabrasclaves: string[]): Observable<InterfazQuery> {

    const objetoAGuardar = {
      query: query,
      estado: estado,
      palabrasClave: palabrasclaves

    };

    const url = environment.url+'doaj';


    console.log(objetoAGuardar)

    return this._httpClient
      .post(url, objetoAGuardar)
      .pipe(map(r => <InterfazQuery>r)); // Castear
  }

}
