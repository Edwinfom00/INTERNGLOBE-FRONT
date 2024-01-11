import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternshipdetailsComponent } from './internshipdetails.component';

describe('InternshipdetailsComponent', () => {
  let component: InternshipdetailsComponent;
  let fixture: ComponentFixture<InternshipdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InternshipdetailsComponent]
    });
    fixture = TestBed.createComponent(InternshipdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
