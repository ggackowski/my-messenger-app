import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationListContentComponent } from './conversation-list-content.component';

describe('ConversationListContentComponent', () => {
  let component: ConversationListContentComponent;
  let fixture: ComponentFixture<ConversationListContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversationListContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationListContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
