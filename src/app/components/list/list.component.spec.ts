import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {ListComponent} from './list.component';
import {ChangeDetectorRef, NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BackendService} from '../../backend.service';
import {Meta, Title} from '@angular/platform-browser';
import {Subject} from 'rxjs';

class MockServices {
  request() {
    return new Subject<any>();
  }

  setTitle() {

  }

  addTag() {

  }
}

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        ListComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: BackendService,
          useClass: MockServices
        },
        {
          provide: Title,
          useClass: MockServices
        },
        {
          provide: Meta,
          useClass: MockServices
        },
        {
          provide: ChangeDetectorRef,
          useClass: MockServices
        },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
