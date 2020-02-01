import { TestBed, inject } from '@angular/core/testing';

import { DeepArtService } from './deep-art.service';

describe('DeepArtService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeepArtService]
    });
  });

  it('should be created', inject([DeepArtService], (service: DeepArtService) => {
    expect(service).toBeTruthy();
  }));
});
