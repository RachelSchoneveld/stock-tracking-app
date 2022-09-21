import { TestBed } from '@angular/core/testing';
import {CanActivateService} from "./can-activate-service.guard";



describe('CnaActivateGuard', () => {
  let guard: CanActivateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanActivateService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
