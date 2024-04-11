import { TestBed } from '@angular/core/testing';

import { HeaderService } from './header.service';

describe('HeaderService', () => {
  let service: HeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initially have default header data', () => {
    expect(service.headerData).toEqual({
      title: 'Início',
      icon: 'home',
      routeUrl: '',
    });
  });

  it('should update header data using setter', () => {
    expect(service.headerData).toEqual({
      title: 'Início',
      icon: 'home',
      routeUrl: '',
    });

    const updatedHeaderData = {
      title: 'Cadastro do produtos',
      icon: 'storefront',
      routeUrl: '/products',
    };

    service.headerData = updatedHeaderData;
    expect(service.headerData).toEqual(updatedHeaderData)
  });
});
