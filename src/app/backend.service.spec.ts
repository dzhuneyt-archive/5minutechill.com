import {TestBed, inject} from '@angular/core/testing';

import {BackendService} from './backend.service';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';

class MockHttpClient {
  request(): Subject<any> {
    return new Subject<any>();
  }
}

describe('BackendService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BackendService,
        {
          provide: HttpClient,
          useClass: MockHttpClient
        }
      ]
    });
  });

  it('should be created', inject([BackendService], (service: BackendService) => {
    expect(service).toBeTruthy();
  }));
});
