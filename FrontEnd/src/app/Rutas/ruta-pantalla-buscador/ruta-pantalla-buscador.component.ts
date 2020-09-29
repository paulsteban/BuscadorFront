import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { ServicioQueryService } from "../../Servicio/servicio-query.service";
import { InterfazQuery } from "../../Interfaz/Interfaz-query";
import { __await } from "tslib";
import listadeActores from 'src/assets/json/actoresytemas.json';
import { InterfaActor } from "../../Interfaz/actores";
@Component({
  selector: 'app-ruta-pantalla-buscador',
  templateUrl: './ruta-pantalla-buscador.component.html',
  styleUrls: ['./ruta-pantalla-buscador.component.css']
})
export class RutaPantallaBuscadorComponent implements OnInit {
  cbxestado = ['Noticias', 'Articulos Cientificos', "Ambos"];
  show: boolean = false;
  show1: boolean = true;
  hideme = true;
  cbxpcs = [];
  cols: any[];
  arregloactoresaux = false;
  query: string;
  estadotabla = false;
  value;
  ActoresYTemas: any;
  ActoresA: InterfaActor;
  TemasA: any;
  botonProcesarActivado = true;
  constructor(private readonly _queryservicio: ServicioQueryService, private readonly _router: Router) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'actor', header: 'Actor' },
      { field: 'cantidad', header: 'Cantidad' }

    ];


    //   this.ActoresYTemas = listadeActores;
    // this.ActoresA=this.ActoresYTemas[0].Actores
    //this.Actores = listadeActores;
    //this.incrementarbarra();

  }

  pruebBoton(f: NgForm) {
    if (f.value.BrowQuery) {
      
        this.botonProcesarActivado = false;
        this._queryservicio.obtenrePrueba(f.value.BrowQuery,
          f.value.BrowEstado,
          this.cbxpcs).subscribe(
            (queryx: InterfazQuery) => {
              console.log('Usuario mando Query');
              console.log(queryx)

            },
            (error) => {
              console.error('Error: ', error);

            }
          )
     

    }
    else {
      alert(`El tema principal no puede estar vacio`);
    }

  }


  onClickMe(f: NgForm) {
    this.cargartabla()
    this.arregloactoresaux = true;
    console.log("" + f.value.BrowQuery + f.value.BrowEstado + this.cbxpcs);
    // if (this.nombreContieneA(razaObjeto.nombre.toString())) {
    const crearQuery$ = this._queryservicio
      .create(
        f.value.BrowQuery,
        f.value.BrowEstado,
        this.cbxpcs,
      );

    crearQuery$
      .subscribe(
        (queryx: InterfazQuery) => {
          console.log('Usuario mando Query');
          alert(`Solicitud Procesada: ${queryx.query}`);

        },
        (error) => {
          console.error('Error: ', error);

        }
      );
  }

  onClickMx(cbxpc) {
    console.log("Cuantos inician:" + this.cbxpcs)
    this.cbxpcs.splice(this.cbxpcs.findIndex(rol => rol === cbxpc), 1);
    console.log("Eliminado:" + this.cbxpcs)
  }


  onClickRol(formularioRol: NgForm) {
    const agregarrol = this.cbxpcs.some(rol => rol === formularioRol.value.BrowPCx);
    if (agregarrol == true) {
      console.log("No se creo la palabra");
      alert("Palabra repetido");

    } else {
      this.cbxpcs.push(formularioRol.value.BrowPCx)
    }
  }
  incrementarbarra() {

    for (let i = 0; i <= 1000;) {
      // __await(10);if(ok){ i++
      this.value = i * 100

    }
  }
  cargartabla() {
    this.estadotabla = true;
    this.ActoresYTemas = listadeActores;
    this.ActoresA = this.ActoresYTemas[0].Actores
    this.TemasA = this.ActoresYTemas[0].Temas
  }
}
