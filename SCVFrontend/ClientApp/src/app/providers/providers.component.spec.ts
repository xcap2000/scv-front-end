import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidersComponent } from './providers.component';
import { ProviderService, ProviderListModel } from '../provider.service';
import { of } from 'rxjs/observable/of';
import { PaginationModule } from 'ngx-bootstrap/pagination';

describe('ProvidersComponent', () => {
  let component: ProvidersComponent;
  let fixture: ComponentFixture<ProvidersComponent>;
  let providerServiceMock: jasmine.SpyObj<ProviderService>;
  let PROVIDERS: ProviderListModel[];

  beforeEach(async(() => {
    PROVIDERS = [];
    providerServiceMock = jasmine.createSpyObj<ProviderService>('ProviderService', ['getProviders']);

    TestBed.configureTestingModule({
      imports: [PaginationModule.forRoot()],
      declarations: [ProvidersComponent],
      providers: [
        { provide: ProviderService, useValue: providerServiceMock }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    providerServiceMock.getProviders.and.returnValue(of(PROVIDERS));
    fixture = TestBed.createComponent(ProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set providers from the service', () => {
    PROVIDERS.push(new ProviderListModel('a', 'b', 'c'));

    expect(fixture.componentInstance.providers.length).toBe(1);
  });

  it('should show the grid', () => {
    PROVIDERS.push(new ProviderListModel('a', 'b', 'c'));

    expect(fixture.componentInstance.showGrid()).toBe(true);
  });

  it('should not show the grid', () => {
    expect(fixture.componentInstance.showGrid()).toBe(false);
  });
});