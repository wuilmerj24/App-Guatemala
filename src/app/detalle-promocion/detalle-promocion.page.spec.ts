import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetallePromocionPage } from './detalle-promocion.page';

describe('DetallePromocionPage', () => {
  let component: DetallePromocionPage;
  let fixture: ComponentFixture<DetallePromocionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallePromocionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetallePromocionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
