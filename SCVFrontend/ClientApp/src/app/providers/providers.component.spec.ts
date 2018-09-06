import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ProvidersComponent } from './providers.component';
import { ProviderService } from '../provider.service';
import { of } from 'rxjs/observable/of';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { By } from '@angular/platform-browser';
import { asyncData } from '../asyncData';
import { ProviderListModel } from '../provider-list.model';
import { PagedResult } from '../paged-result.model';
import { FormsModule } from '@angular/forms';


describe('ProvidersComponent', () => {
  let component: ProvidersComponent;
  let fixture: ComponentFixture<ProvidersComponent>;
  let providerServiceMock: jasmine.SpyObj<ProviderService>;
  let pagedResult: PagedResult<ProviderListModel>;
  let providers: ProviderListModel[];

  beforeEach(async(() => {
    providers = [];
    pagedResult = { totalCount: 0, items: providers };
    providerServiceMock = jasmine.createSpyObj<ProviderService>('ProviderService', ['get']);

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        PaginationModule.forRoot()
      ],
      declarations: [ProvidersComponent],
      providers: [
        { provide: ProviderService, useValue: providerServiceMock }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvidersComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start at first page', () => {
    expect(component.currentPage).toBe(1);
  });

  it('should start with total count of 0', () => {
    expect(component.totalCount).toBe(0);
  });

  it('should start with null filter', () => {
    expect(component.filter).toBeNull();
  });

  it('should set total count from the service', () => {
    pagedResult.totalCount = 10;
    providerServiceMock.get.and.returnValue(of(pagedResult));

    fixture.detectChanges();

    expect(component.totalCount).toBe(10);
  });

  it('should set providers from the service', () => {
    providerServiceMock.get.and.returnValue(of(pagedResult));
    providers.push({ id: '4e9d0b71-a1a6-46c8-8ad2-4845201acf96', name: 'Provider 1', baseApiUrl: 'http://provider1.com' });

    fixture.detectChanges();

    expect(component.providers.length).toBe(1);
  });

  it('should show the grid', () => {
    providerServiceMock.get.and.returnValue(of(pagedResult));
    providers.push({ id: '4e9d0b71-a1a6-46c8-8ad2-4845201acf96', name: 'Provider 1', baseApiUrl: 'http://provider1.com' });

    fixture.detectChanges();

    expect(component.showGrid()).toBe(true);
  });

  it('should not show the grid', () => {
    expect(component.showGrid()).toBe(false);
  });

  it('should show the empty message', () => {
    providerServiceMock.get.and.returnValue(of(pagedResult));

    fixture.detectChanges();

    expect(component.showEmptyMessage()).toBe(true);
  });

  it('should not show the empty message', () => {
    providerServiceMock.get.and.returnValue(of(pagedResult));
    providers.push({ id: '4e9d0b71-a1a6-46c8-8ad2-4845201acf96', name: 'Provider 1', baseApiUrl: 'http://provider1.com' });

    fixture.detectChanges();

    expect(component.showEmptyMessage()).toBe(false);
  });

  it('should show and hide loading', fakeAsync(() => {
    providerServiceMock.get.and.returnValue(asyncData(pagedResult));

    fixture.detectChanges();

    tick();
    fixture.detectChanges();
  }));

  it('should not show the grid when loading', fakeAsync(() => {
    providerServiceMock.get.and.returnValue(asyncData(pagedResult));
    providers.push({ id: '4e9d0b71-a1a6-46c8-8ad2-4845201acf96', name: 'Provider 1', baseApiUrl: 'http://provider1.com' });

    fixture.detectChanges();
    expect(component.showGrid()).toBe(false);

    tick();
    fixture.detectChanges();

    expect(component.showGrid()).toBe(true);
  }));

  it('should not show the empty message when loading', fakeAsync(() => {
    providerServiceMock.get.and.returnValue(asyncData(pagedResult));

    fixture.detectChanges();
    expect(component.showEmptyMessage()).toBe(false);

    tick();
    fixture.detectChanges();

    expect(component.showEmptyMessage()).toBe(true);
  }));

  it('should render the grid', () => {
    providerServiceMock.get.and.returnValue(of(pagedResult));
    providers.push({ id: '4e9d0b71-a1a6-46c8-8ad2-4845201acf96', name: 'Provider 1', baseApiUrl: 'http://provider1.com' });
    providers.push({ id: 'eac8fd29-0dba-493b-8725-6e1f062d41e9', name: 'Provider 2', baseApiUrl: 'http://provider2.com' });

    fixture.detectChanges();

    let headers = fixture.debugElement.queryAll(By.css('th'));

    expect(headers.length).toBe(2);

    expect((headers[0].nativeElement as HTMLTableDataCellElement).innerText).toBe('Name');
    expect((headers[1].nativeElement as HTMLTableDataCellElement).innerText).toBe('Base API URL');

    let items = fixture.debugElement.queryAll(By.css('td'));

    expect(items.length).toBe(4);

    let index = 0;
    for (const provider of providers) {
      const nameElement = items[index++];
      const baseUrlElement = items[index++];

      expect((nameElement.nativeElement as HTMLTableDataCellElement).innerText).toBe(provider.name);
      expect((baseUrlElement.nativeElement as HTMLTableDataCellElement).innerText).toBe(provider.baseApiUrl);
    }
  });

  it('should filter', () => {
    providerServiceMock.get.and.returnValue(of(pagedResult));

    component.filter = 'provider1';

    component.search();

    expect(providerServiceMock.get).toHaveBeenCalledWith('provider1', 1);
  });

  it('should clear the filter', () => {
    providerServiceMock.get.and.returnValue(of(pagedResult));

    component.filter = 'provider1';

    component.search();

    expect(providerServiceMock.get).toHaveBeenCalledWith('provider1', 1);

    component.clear();

    component.search();

    expect(providerServiceMock.get).toHaveBeenCalledWith(null, 1);
  });

  it('should change the page', () => {
    providerServiceMock.get.and.returnValue(of(pagedResult));

    component.pageChanged({page: 2});

    expect(component.currentPage).toBe(2);

    expect(providerServiceMock.get).toHaveBeenCalledWith(null, 2);
  });

  it('should reset the page after filtering', () => {
    providerServiceMock.get.and.returnValue(of(pagedResult));

    component.pageChanged({page: 5});

    component.filter = 'provider1';

    component.search();

    expect(providerServiceMock.get).toHaveBeenCalledWith('provider1', 1);
  });

  it('should reset the page after clearing', () => {
    providerServiceMock.get.and.returnValue(of(pagedResult));

    component.filter = 'provider1';
    
    component.search();

    component.pageChanged({page: 5});

    expect(providerServiceMock.get).toHaveBeenCalledWith('provider1', 5);

    component.clear();

    expect(providerServiceMock.get).toHaveBeenCalledWith(null, 1);
  });
});