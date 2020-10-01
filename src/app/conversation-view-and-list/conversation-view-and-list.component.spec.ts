import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationViewAndListComponent } from './conversation-view-and-list.component';

describe('ConversationViewAndListComponent', () => {
  let component: ConversationViewAndListComponent;
  let fixture: ComponentFixture<ConversationViewAndListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversationViewAndListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationViewAndListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
