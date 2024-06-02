import { TestBed } from '@angular/core/testing';

import { DefaultProjectService } from './default-project.service';

describe('DefaultProjectService', () => {
  let service: DefaultProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
