import { TestBed } from '@angular/core/testing';

import { ConversationDataService } from './conversation-data.service';

describe('ConversationDataService', () => {
  let service: ConversationDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConversationDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
