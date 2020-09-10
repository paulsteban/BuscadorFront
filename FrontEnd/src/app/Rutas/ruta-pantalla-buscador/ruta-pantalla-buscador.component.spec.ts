import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaPantallaBuscadorComponent } from './ruta-pantalla-buscador.component';

describe('RutaPantallaBuscadorComponent', () => {
  let component: RutaPantallaBuscadorComponent;
  let fixture: ComponentFixture<RutaPantallaBuscadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutaPantallaBuscadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaPantallaBuscadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
