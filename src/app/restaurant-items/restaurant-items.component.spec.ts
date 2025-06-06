import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantItemsComponent } from './restaurant-items.component';

describe('RestaurantItemsComponent', () => {
  let component: RestaurantItemsComponent;
  let fixture: ComponentFixture<RestaurantItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
