import { TestBed } from '@angular/core/testing';

import { FirebaseConversationDataManipulationService } from './firebase-conversation-data-manipulation.service';

describe('FirebaseConversationDataManipulationService', () => {
  let service: FirebaseConversationDataManipulationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseConversationDataManipulationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
