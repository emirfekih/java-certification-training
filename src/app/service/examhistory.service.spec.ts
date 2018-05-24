import { TestBed, inject } from '@angular/core/testing';

import { ExamhistoryService } from './examhistory.service';

describe('ExamhistoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExamhistoryService]
    });
  });

  it('should be created', inject([ExamhistoryService], (service: ExamhistoryService) => {
    expect(service).toBeTruthy();
  }));
});
