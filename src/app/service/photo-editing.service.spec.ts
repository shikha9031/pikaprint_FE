import { TestBed, inject } from '@angular/core/testing';

import { PhotoEditingService } from './photo-editing.service';

describe('PhotoEditingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhotoEditingService]
    });
  });

  it('should be created', inject([PhotoEditingService], (service: PhotoEditingService) => {
    expect(service).toBeTruthy();
  }));
});
