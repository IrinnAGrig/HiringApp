import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleEmployeeInfoComponent } from './single-employee-info.component';

describe('SingleEmployeeInfoComponent', () => {
  let component: SingleEmployeeInfoComponent;
  let fixture: ComponentFixture<SingleEmployeeInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleEmployeeInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleEmployeeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
