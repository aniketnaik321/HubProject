import { TestBed } from '@angular/core/testing';

import { HttpReqInterceptor } from './http-req.interceptor';

describe('HttpReqInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpReqInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpReqInterceptor = TestBed.inject(HttpReqInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
