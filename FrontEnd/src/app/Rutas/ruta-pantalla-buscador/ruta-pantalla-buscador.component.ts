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
  springermodel = false;
  doajmodel = false;
  doajmodeles = false;
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
      if (this.nytmodel || this.comerciomodel || this.springermodel || this.doajmodel || this.doajmodeles) {
        console.log(this.ActoresA+"actores eliminar")

        this.ActoresA = []
        this.TemasA = []
        this.progressBar.start();
        this.botonProcesarActivado = false;
        this.presentarAlerta = false;

          const objetoAGuardar = {
            query: f.value.BrowQuery,
            estado: f.value.BrowEstado,
            palabrasClave: this.cbxpcs,
            nyt: this.nytmodel,
            doaj: this.doajmodel,
            comercio: this.comerciomodel,
            doajes: this.doajmodeles,
            springer:this.springermodel
          };

          this._queryservicio.obtenerPalabrasRepetidas(objetoAGuardar).subscribe(
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
        




      } else {
        this.presentarAlerta = true;
      }



    }
    else {
      alert(`El tema principal no puede estar vacio`);
    }

  }



  eliminarElemento(cbxpc: any) {
    this.cbxpcs.splice(this.cbxpcs.findIndex(rol => rol === cbxpc), 1);
  }


  agregarPalabra() {
    if(this.palabraClave != '' && this.palabraClave != undefined){
      console.log(this.palabraClave +"palabraaaaaaaaa clave");

      const agregarrol = this.cbxpcs.some(rol => rol === this.palabraClave);
      if (agregarrol == true) {
        console.log("No se creo la palabra");
        alert("Palabra clave repetida");
  
      } else {
  
        this.cbxpcs.push(this.palabraClave)
        this.palabraClave = ''
      }
    }else{
      alert("La palabra clave no puede ser nula");

    }

    
  }

  cargartabla() {
    this.estadotabla = true;
    this.ActoresA = this.actoresTemasObtenidos.Actores
    this.TemasA = this.actoresTemasObtenidos.Temas
  }

}
