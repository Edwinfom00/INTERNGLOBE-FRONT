import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntershipListComponent } from './intership-list.component';

describe('IntershipListComponent', () => {
  let component: IntershipListComponent;
  let fixture: ComponentFixture<IntershipListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IntershipListComponent]
    });
    fixture = TestBed.createComponent(IntershipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
