import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentMessageStatusComponent } from './sent-message-status.component';

describe('SentMessageStatusComponent', () => {
  let component: SentMessageStatusComponent;
  let fixture: ComponentFixture<SentMessageStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentMessageStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentMessageStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
