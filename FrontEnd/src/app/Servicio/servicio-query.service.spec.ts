import { TestBed } from '@angular/core/testing';

import { ServicioQueryService } from './servicio-query.service';

describe('ServicioQueryService', () => {
  let service: ServicioQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
