import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutemediumComponent } from './routemedium.component';

describe('RoutemediumComponent', () => {
  let component: RoutemediumComponent;
  let fixture: ComponentFixture<RoutemediumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutemediumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutemediumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
