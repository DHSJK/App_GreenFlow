import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestdbPage } from './testdb.page';

describe('TestdbPage', () => {
  let component: TestdbPage;
  let fixture: ComponentFixture<TestdbPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TestdbPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
