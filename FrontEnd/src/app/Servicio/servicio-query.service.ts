import { Injectable } from '@angular/core';
import {InterfazQuery} from "../Interfaz/Interfaz-query";
import {Observable} from "rxjs/internal/Observable";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ServicioQueryService {
  nombreModelo = "Buscador";
  constructor(private readonly _httpClient: HttpClient) { }

  create(query: string,
         estado: string,
         palabrasclaves: string[],
  ): Observable<InterfazQuery> {

    const objetoAGuardar = {
      query: query,
      estado: estado,
      palabrasclaves: palabrasclaves,

    };

    const url = environment.url + this.nombreModelo;

    return this._httpClient
      .post(url, objetoAGuardar)
      .pipe(map(r => <InterfazQuery> r)); // Castear
  }
}
