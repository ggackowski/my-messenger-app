import { TestBed } from '@angular/core/testing';

import { MockConversationDataManipulationService } from './mock-conversation-data-manipulation.service';

describe('MockConversationDataManipulationService', () => {
  let service: MockConversationDataManipulationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockConversationDataManipulationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
