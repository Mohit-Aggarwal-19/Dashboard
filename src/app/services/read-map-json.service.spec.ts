import { TestBed } from '@angular/core/testing';

import { ReadMapJSONService } from './read-map-json.service';

describe('ReadMapJSONService', () => {
  let service: ReadMapJSONService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadMapJSONService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
