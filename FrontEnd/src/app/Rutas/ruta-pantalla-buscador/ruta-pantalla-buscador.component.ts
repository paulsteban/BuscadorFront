import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { ServicioQueryService } from "../../Servicio/servicio-query.service";
import { InterfazQuery } from "../../Interfaz/Interfaz-query";
import { __await } from "tslib";
import listadeActores from 'src/assets/json/actoresytemas.json';
import { InterfaActor } from "../../Interfaz/actores";
import { ActoresTemasInterface } from 'src/app/Interfaz/ActoresTemas';
import { NgProgressComponent } from 'ngx-progressbar';

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
  tituloActores: any[];
  tituloTemas: any[];
  arregloactoresaux = false;
  query: string;
  estadotabla = false;
  value;
  ActoresYTemas: any;
  ActoresA: any = [];
  TemasA: any = [];
  botonProcesarActivado = true;
  objetoGuardar: InterfazQuery;
  palabraClave: string;
  nytmodel = false;
  comerciomodel = false;
  scielomodel = false;
  doajmodel = false;
  presentarAlerta = false;
  actoresTemasObtenidos: ActoresTemasInterface;
  @ViewChild(NgProgressComponent) progressBar: NgProgressComponent;

  constructor(private readonly _queryservicio: ServicioQueryService, private readonly _router: Router) { }

  ngOnInit(): void {
    this.tituloActores = [
      { field: 'actor', header: 'Actores' },
      { field: 'cantidad', header: 'Repeticiones' }

    ];
    this.tituloTemas = [
      { field: 'temas', header: 'Temas' },
      { field: 'cantidad', header: 'Repeticiones' }

    ];


    //   this.ActoresYTemas = listadeActores;
    // this.ActoresA=this.ActoresYTemas[0].Actores
    //this.Actores = listadeActores;
    //this.incrementarbarra();

  }

  obtenerFormulario(f: NgForm) {
    if (f.value.BrowQuery) {
      if (this.nytmodel || this.comerciomodel || this.scielomodel || this.doajmodel) {


        this.ActoresA = []
        this.TemasA = []
        this.progressBar.start();
        this.botonProcesarActivado = false;
        this.presentarAlerta = false;

        if (this.comerciomodel) {
          this._queryservicio.obtenerComercio(f.value.BrowQuery,
            f.value.BrowEstado,
            this.cbxpcs).subscribe(
              (respuesta: InterfazQuery) => {
                console.log(respuesta.ActoresTemas[0])
                this.actoresTemasObtenidos = respuesta.ActoresTemas[0];
                this.botonProcesarActivado = true;
                this.progressBar.complete();

                this.cargartabla()
              },
              (error) => {
                this.progressBar.complete();
                this.botonProcesarActivado = true;
                console.error('Error: ', error);
                alert("Ha ocurrido un error al momento de obtener la información de las fuentes");


              }
            )
        }else if (this.nytmodel){
          this._queryservicio.obtenerNYT(f.value.BrowQuery,
            f.value.BrowEstado,
            this.cbxpcs).subscribe(
              (respuesta: InterfazQuery) => {
                console.log(respuesta.ActoresTemas[0])
                this.actoresTemasObtenidos = respuesta.ActoresTemas[0];
                this.botonProcesarActivado = true;
                this.progressBar.complete();

                this.cargartabla()
              },
              (error) => {
                this.progressBar.complete();
                this.botonProcesarActivado = true;
                console.error('Error: ', error);
                alert("Ha ocurrido un error al momento de obtener la información de las fuentes");


              }
            )
        }else if(this.doajmodel){
          this._queryservicio.obtenerDoaj(f.value.BrowQuery,
            f.value.BrowEstado,
            this.cbxpcs).subscribe(
              (respuesta: InterfazQuery) => {
                console.log(respuesta.ActoresTemas[0])
                this.actoresTemasObtenidos = respuesta.ActoresTemas[0];
                this.botonProcesarActivado = true;
                this.progressBar.complete();

                this.cargartabla()
              },
              (error) => {
                this.progressBar.complete();
                this.botonProcesarActivado = true;
                console.error('Error: ', error);
                alert("Ha ocurrido un error al momento de obtener la información de las fuentes");


              }
            )
        }else{
          console.log("scielo")
          this._queryservicio.obtenerDoaj(f.value.BrowQuery,
            f.value.BrowEstado,
            this.cbxpcs).subscribe(
              (respuesta: InterfazQuery) => {
                console.log(respuesta.ActoresTemas[0])
                this.actoresTemasObtenidos = respuesta.ActoresTemas[0];
                this.botonProcesarActivado = true;
                this.progressBar.complete();

                this.cargartabla()
              },
              (error) => {
                this.progressBar.complete();
                this.botonProcesarActivado = true;
                console.error('Error: ', error);
                alert("Ha ocurrido un error al momento de obtener la información de las fuentes");


              }
            )
        }



        
      } else {
        this.presentarAlerta = true;
      }



    }
    else {
      alert(`El tema principal no puede estar vacio`);
    }

  }

  obtenerComercio() {

  }


  eliminarElemento(cbxpc: any) {
    this.cbxpcs.splice(this.cbxpcs.findIndex(rol => rol === cbxpc), 1);
  }


  agregarPalabra() {

    const agregarrol = this.cbxpcs.some(rol => rol === this.palabraClave);
    if (agregarrol == true) {
      console.log("No se creo la palabra");
      alert("Palabra repetido");

    } else {

      this.cbxpcs.push(this.palabraClave)
      this.palabraClave = ''
    }
  }

  cargartabla() {
    this.estadotabla = true;
    this.ActoresA = this.actoresTemasObtenidos.Actores
    this.TemasA = this.actoresTemasObtenidos.Temas
  }

}
