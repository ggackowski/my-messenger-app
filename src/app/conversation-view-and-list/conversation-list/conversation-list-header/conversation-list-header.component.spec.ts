import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationListHeaderComponent } from './conversation-list-header.component';

describe('ConversationListHeaderComponent', () => {
  let component: ConversationListHeaderComponent;
  let fixture: ComponentFixture<ConversationListHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversationListHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
