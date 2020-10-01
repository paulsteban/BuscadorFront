import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { ServicioQueryService } from "../../Servicio/servicio-query.service";
import { InterfazQuery } from "../../Interfaz/Interfaz-query";
import { __await } from "tslib";
import listadeActores from 'src/assets/json/actoresytemas.json';
import { InterfaActor } from "../../Interfaz/actores";
import { ActoresTemasInterface } from 'src/app/Interfaz/ActoresTemas';
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
  ActoresA: any;
  TemasA: any;
  botonProcesarActivado = true;
  objetoGuardar: InterfazQuery;
  palabraClave:string;
  nytmodel=false;
  comerciomodel=false;
  scielomodel=false;
  doajmodel=false;
  presentarAlerta=false;
  actoresTemasObtenidos:ActoresTemasInterface;
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

  obtenerFormulario(f: NgForm) {
    if (f.value.BrowQuery) {
      if(this.nytmodel || this.doajmodel || this.scielomodel || this.doajmodel){
        this.botonProcesarActivado = false;
        this.presentarAlerta=false;

        this._queryservicio.obtenerNYT(f.value.BrowQuery,
          f.value.BrowEstado,
          this.cbxpcs).subscribe(
            (respuesta: InterfazQuery) => {
              console.log('Usuario Query:              ');
              this.actoresTemasObtenidos=respuesta.ActoresTemas[0];
              console.log(respuesta.ActoresTemas[0]+"******************"+this.actoresTemasObtenidos.Actores)
              this.botonProcesarActivado = true;
              this.cargartabla()

            },
            (error) => {
              this.botonProcesarActivado = true;

              console.error('Error: ', error);
              alert("Ha ocurrido un error al momento de obtener la información de las fuentes");

  
            }
          )
      }else{
        this.presentarAlerta=true;
      }
    


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
    this.objetoGuardar = {
      estado: f.value.BrowEstado,
      palabrasClaves: this.cbxpcs,
      query: f.value.BrowQuery,
    }

    const crearQuery$ = this._queryservicio
      .create(
        this.objetoGuardar
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

  eliminarElemento(cbxpc:any) {
    this.cbxpcs.splice(this.cbxpcs.findIndex(rol => rol === cbxpc), 1);
  }


  agregarPalabra() {
    const agregarrol = this.cbxpcs.some(rol => rol === this.palabraClave);
    if (agregarrol == true) {
      console.log("No se creo la palabra");
      alert("Palabra repetido");

    } else {
      
      this.cbxpcs.push(this.palabraClave)
      this.palabraClave=''
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
    this.ActoresA = this.actoresTemasObtenidos.Actores
    this.TemasA = this.actoresTemasObtenidos.Temas
  }

}
