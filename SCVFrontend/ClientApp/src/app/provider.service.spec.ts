import { TestBed, inject } from '@angular/core/testing';
import { ProviderService } from './provider.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { asyncData } from './asyncData';
import { ProviderListModel } from './provider-list.model';
import { PagedResult } from './paged-result.model';


describe('ProviderService', () => {
  let httpClientMock: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientMock = jasmine.createSpyObj<HttpClient>('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        ProviderService,
        { provide: HttpClient, useValue: httpClientMock },
        { provide: 'BASE_URL', useValue: 'https://localhost/' }
      ]
    });
  });

  it('should be created', inject([ProviderService], (service: ProviderService) => {
    expect(service).toBeTruthy();
  }));


  it('should return the data', inject([ProviderService], (service: ProviderService) => {
    const expectedPagedResult: PagedResult<ProviderListModel> = {
      totalCount: 1,
      items: [
        { id: '4e9d0b71-a1a6-46c8-8ad2-4845201acf96', name: 'Provider 1', baseApiUrl: 'http://provider1.com' }
      ]
    };

    httpClientMock.get.and.returnValue(asyncData(expectedPagedResult));

    service.get()
      .subscribe(
        pagedResult => expect(pagedResult).toEqual(expectedPagedResult, 'expected providers'),
        fail);
    
    expect(httpClientMock.get.calls.count()).toBe(1, 'one call');
  }));

  it('should filter', inject([ProviderService], (service: ProviderService) => {
    const expectedPagedResult: PagedResult<ProviderListModel> = {
      totalCount: 0,
      items: []
    };

    httpClientMock.get.and.returnValue(asyncData(expectedPagedResult));

    service.get('provider1', 9, 9)
      .subscribe(
        pagedResult => expect(pagedResult).toEqual(expectedPagedResult, 'expected providers'),
        fail);
    
    const headers = new HttpHeaders()
      .set('Content-Type', ['application/json', 'charset=utf-8']);

    const params = new HttpParams()
      .set('page', '9')
      .set('itemsPerPage', '9')
      .set('filter', 'provider1');
    
    expect(httpClientMock.get).toHaveBeenCalledWith('https://localhost/providers', { headers: headers, params: params });
  }));

  it('should page', inject([ProviderService], (service: ProviderService) => {
    const expectedPagedResult: PagedResult<ProviderListModel> = {
      totalCount: 0,
      items: []
    };

    httpClientMock.get.and.returnValue(asyncData(expectedPagedResult));

    service.get(null, 2)
      .subscribe(
        pagedResult => expect(pagedResult).toEqual(expectedPagedResult, 'expected providers'),
        fail);

    const headers = new HttpHeaders()
      .set('Content-Type', ['application/json', 'charset=utf-8']);

    const params = new HttpParams()
        .set('page', '2')
        .set('itemsPerPage', '10');
    
    expect(httpClientMock.get).toHaveBeenCalledWith('https://localhost/providers', { headers: headers, params: params });
  }));

  it('should set items per page', inject([ProviderService], (service: ProviderService) => {
    const expectedPagedResult: PagedResult<ProviderListModel> = {
      totalCount: 0,
      items: []
    };

    httpClientMock.get.and.returnValue(asyncData(expectedPagedResult));

    service.get(null, 1, 15)
      .subscribe(
        pagedResult => expect(pagedResult).toEqual(expectedPagedResult, 'expected providers'),
        fail);

    const headers = new HttpHeaders()
      .set('Content-Type', ['application/json', 'charset=utf-8']);

    const params = new HttpParams()
        .set('page', '1')
        .set('itemsPerPage', '15');
    
    expect(httpClientMock.get).toHaveBeenCalledWith('https://localhost/providers', { headers: headers, params: params });
  }));
});