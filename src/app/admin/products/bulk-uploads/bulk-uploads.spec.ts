import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkUploads } from './bulk-uploads';

describe('BulkUploads', () => {
  let component: BulkUploads;
  let fixture: ComponentFixture<BulkUploads>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BulkUploads]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulkUploads);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
