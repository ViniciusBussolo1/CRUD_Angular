import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { Router, RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';
import { HeaderService } from './header.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let service: HeaderService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      providers: [HeaderService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    service = TestBed.inject(HeaderService);
    router = TestBed.inject(Router);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the header component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the logo image', () => {
    const LogoImage = fixture.debugElement.query(By.css('.logo'));
    expect(LogoImage).toBeTruthy();
  });

  it('should display the title Início and icon home from HeaderService', () => {
    const titleElement = fixture.debugElement.query(By.css('.title-group a'));
    const iconElement = fixture.debugElement.query(By.css('.title-group i'));

    expect(titleElement).toBeTruthy();
    expect(titleElement.nativeElement.textContent).toContain('Início');

    expect(iconElement).toBeTruthy();
    expect(iconElement.nativeElement.textContent).toContain('home');
  });

  it('should display the title Cadastro do produtos and icon storefront from HeaderService', () => {
    const updatedHeaderData = {
      title: 'Cadastro do produtos',
      icon: 'storefront',
      routeUrl: '/products',
    };

    service.headerData = updatedHeaderData;

    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('.title-group a'));
    const iconElement = fixture.debugElement.query(By.css('.title-group i'));

    expect(titleElement).toBeTruthy();
    expect(titleElement.nativeElement.textContent).toContain('Cadastro do produtos');

    expect(iconElement).toBeTruthy();
    expect(iconElement.nativeElement.textContent).toContain('storefront');
  });
});
