import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavComponent } from './nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterModule } from '@angular/router';
import { HomeComponent } from '../../../views/home/home.component';
import { ProductCrudComponent } from '../../../views/product-crud/product-crud.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        RouterModule.forRoot([
          {
            path: '',
            component: HomeComponent,
          },
          {
            path: 'products',
            component: ProductCrudComponent,
          },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create the nav component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the nav list with correct links', () => {
    const links = fixture.nativeElement.querySelectorAll('.nav-list a');
    expect(links.length).toBe(2);

    expect(links[0].textContent).toContain('Início');
    expect(links[0].getAttribute('href')).toBe('/');

    expect(links[1].textContent).toContain('Produtos');
    expect(links[1].getAttribute('href')).toBe('/products');
  });

  it('should navigate for "/" when the link is clicked', async () => {
    const linkInicio = fixture.nativeElement.querySelector('a[routerLink="/"]');
    linkInicio.click();

    fixture.detectChanges();

    expect(router.url).toBe('/');
  });

  it('should navigate for "/products" when the link is clicked',async () => {
    const linkProducts = fixture.nativeElement.querySelector(
      'a[routerLink="/products"]'
    );
    linkProducts.click();

    await router.navigateByUrl('/products');

    fixture.detectChanges();

    expect(router.url).toBe('/products');
  });
});
