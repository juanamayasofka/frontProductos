import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThanksPagesComponent } from './thanks-pages.component';

describe('ThanksPagesComponent', () => {
  let component: ThanksPagesComponent;
  let fixture: ComponentFixture<ThanksPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThanksPagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThanksPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
