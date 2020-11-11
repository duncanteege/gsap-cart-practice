import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GsapCartPage } from './gsap-cart.page';

describe('GsapCartPage', () => {
  let component: GsapCartPage;
  let fixture: ComponentFixture<GsapCartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GsapCartPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GsapCartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
