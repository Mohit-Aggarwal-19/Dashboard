import { TestBed } from '@angular/core/testing';

import { FetchDataFromApiService } from './fetch-data-from-api.service';

describe('FetchDataFromApiService', () => {
  let service: FetchDataFromApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchDataFromApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
