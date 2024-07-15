import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleJobInfoComponent } from './single-job-info.component';

describe('SingleJobInfoComponent', () => {
  let component: SingleJobInfoComponent;
  let fixture: ComponentFixture<SingleJobInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleJobInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleJobInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
