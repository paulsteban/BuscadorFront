import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RutaPantallaBuscadorComponent } from './Rutas/ruta-pantalla-buscador/ruta-pantalla-buscador.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CdkTableModule} from "@angular/cdk/table";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {TableModule} from "primeng/table";

@NgModule({
  declarations: [
    AppComponent,
    RutaPantallaBuscadorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule ,
    HttpClientModule,
    CdkTableModule,TableModule,
    BrowserAnimationsModule,MatProgressBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
