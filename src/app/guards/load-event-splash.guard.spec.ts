import { TestBed } from '@angular/core/testing';

import { LoadEventSplashGuard } from './load-event-splash.guard';

describe('LoadEventSplashGuard', () => {
  let guard: LoadEventSplashGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoadEventSplashGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
